package vn.edu.iuh.fit.scheduleservice.services.impl;

import org.apache.commons.lang.time.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.*;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.scheduleservice.dtos.*;
import vn.edu.iuh.fit.scheduleservice.models.ClassSchedule;
import vn.edu.iuh.fit.scheduleservice.models.ClassType;
import vn.edu.iuh.fit.scheduleservice.models.StudentSchedule;
import vn.edu.iuh.fit.scheduleservice.repositories.ClassScheduleRepository;
import vn.edu.iuh.fit.scheduleservice.repositories.StudentScheduleRepository;
import vn.edu.iuh.fit.scheduleservice.services.ClassScheduleService;

import java.text.ParseException;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class ClassScheduleServiceImpl implements ClassScheduleService {
    private final StudentScheduleRepository studentScheduleRepository;
    private final ClassScheduleRepository classScheduleRepository;
    private final MongoTemplate mongoTemplate;

    @Autowired
    public ClassScheduleServiceImpl(StudentScheduleRepository studentScheduleRepository,
                                    ClassScheduleRepository classScheduleRepository, MongoTemplate mongoTemplate) {
        this.studentScheduleRepository = studentScheduleRepository;
        this.classScheduleRepository = classScheduleRepository;
        this.mongoTemplate = mongoTemplate;
    }

    @Override
    public List<ClassSchedule> getAllSchedule(String studentId) {
        // Retrieve student schedules based on studentId
        List<StudentSchedule> studentSchedules = studentScheduleRepository.findByStudentId(studentId);

        List<String> classIds = studentSchedules.stream()
                .map(StudentSchedule::getClassId)
                .collect(Collectors.toList());

        // Retrieve class schedules associated with the extracted courseIds
        return classScheduleRepository.findByClassIdIn(classIds);
    }

    @Override
    public StudentSchedule registrySchedule(String studentId, String courseId) {
        return studentScheduleRepository.save(new StudentSchedule(studentId, courseId));
    }

    @Override
    public void cancelSchedule(String studentId, String classId) {
        studentScheduleRepository.deleteByStudentIdAndClassId(studentId, classId);
    }

    @Override
    public Map<String, ClassSchedule> getScheduleByClassIds(List<String> ids) {
        MatchOperation matchClass = Aggregation.match(new Criteria("_id").in(ids));

        Aggregation aggregation = Aggregation.newAggregation(
                matchClass
        );
        List<ClassSchedule> results = mongoTemplate.aggregate(aggregation, "classSchedule", ClassSchedule.class).getMappedResults();

        Map<String, ClassSchedule> resultMap = results.stream()
                .collect(Collectors.toMap(ClassSchedule::getClassId, Function.identity()));

        return resultMap;
    }

    @Override
    public List<WeekScheduleDTO> getScheduleByDate(String studentId, DateRequest dateRequest) throws ParseException {
        Calendar cal = Calendar.getInstance();
        Date[] dates = calculateStartAndEndDates(cal, dateRequest);
        Date startDate = dates[0];
        Date endDate = dates[1];

        Aggregation aggregation = createScheduleAggregation(studentId, startDate, endDate);

        List<QueryClassSchedule> queryClassScheduleList = mongoTemplate.aggregate(aggregation, "studentSchedule", QueryClassSchedule.class).getMappedResults();

        Map<Integer, List<QueryClassSchedule>> scheduleMap = populateScheduleMap(queryClassScheduleList);

        return createWeeklySchedule(cal, scheduleMap);
    }

    private Date[] calculateStartAndEndDates(Calendar cal, DateRequest dateRequest) {
        cal.set(Calendar.YEAR, dateRequest.year());
        cal.set(Calendar.MONTH, dateRequest.month() - 1);
        cal.set(Calendar.DAY_OF_MONTH, dateRequest.day());

        int dayOfWeek = cal.get(Calendar.DAY_OF_WEEK);
        int daysToSubtract = (dayOfWeek - Calendar.MONDAY + 7) % 7;
        int daysToAdd = (Calendar.SUNDAY - dayOfWeek + 7) % 7;

        cal.add(Calendar.DAY_OF_MONTH, -daysToSubtract);
        Date startDate = cal.getTime();
        cal.add(Calendar.DAY_OF_MONTH, daysToSubtract + daysToAdd);
        Date endDate = cal.getTime();
        cal.add(Calendar.DAY_OF_MONTH, -6);

        return new Date[]{startDate, endDate};
    }

    private Aggregation createScheduleAggregation(String studentId, Date startDate, Date endDate) {
        MatchOperation matchStudent = Aggregation.match(new Criteria("studentId").is(studentId));
        LookupOperation lookupSchedule = LookupOperation.newLookup()
                .from("classSchedule")
                .localField("classId")
                .foreignField("_id")
                .as("classSchedule");
        UnwindOperation unwindSchedule = Aggregation.unwind("classSchedule");
        UnwindOperation unwindSchedules = Aggregation.unwind("classSchedule.schedules");
        MatchOperation matchDate = Aggregation.match(new Criteria().andOperator(
                Criteria.where("classSchedule.schedules.startDate").lte(endDate),
                Criteria.where("classSchedule.schedules.endDate").gte(startDate)
        ));

        ProjectionOperation projectFields = Aggregation.project("_id", "classSchedule.courseId", "classSchedule.courseName", "classSchedule.schedules")
                .and("_id").as("classId");
        return Aggregation.newAggregation(
                matchStudent,
                lookupSchedule,
                unwindSchedule,
                unwindSchedules,
                matchDate,
                projectFields
        );
    }

    private Map<Integer, List<QueryClassSchedule>> populateScheduleMap(List<QueryClassSchedule> queryClassScheduleList) {
        Map<Integer, List<QueryClassSchedule>> scheduleMap = new HashMap<>();
        queryClassScheduleList.forEach(schedule -> {
            int dayOfWeekInQuerySchedule = schedule.schedules().getDayOfWeek();
            scheduleMap.computeIfAbsent(dayOfWeekInQuerySchedule, k -> new ArrayList<>()).add(schedule);
        });
        return scheduleMap;
    }


    private List<WeekScheduleDTO> createWeeklySchedule(Calendar cal, Map<Integer, List<QueryClassSchedule>> scheduleMap) {
        List<WeekScheduleDTO> weeklySchedule = new ArrayList<>();
        for (int i = 0; i < 7; i++) {
            cal.set(Calendar.DAY_OF_WEEK, i + Calendar.MONDAY);
            weeklySchedule.add(new WeekScheduleDTO(cal.getTime()));
        }
        cal.add(Calendar.DAY_OF_MONTH, -6);

        scheduleMap.forEach((key, schedules) -> {
            schedules.forEach(currentSchedule -> {
                List<Date> daysOff = currentSchedule.schedules().getDayOff();
                if (daysOff != null && isDayOff(daysOff, weeklySchedule.get(key - 1).getDate())) {
                    currentSchedule.schedules().setClassType(ClassType.NO_CLASS_DAY);
                }
            });

            weeklySchedule.get(key - 1).setSchedule(schedules);
        });

        return weeklySchedule;
    }

    private boolean isDayOff(List<Date> dayOff, Date date) {
        for (Date d : dayOff) {
            if (DateUtils.isSameDay(d, date)) {
                return true;
            }
        }
        return false;
    }

    @Override
    public List<QueryClassSchedule> getEachScheduleByClassIds(List<String> ids) {
        MatchOperation matchClass = Aggregation.match(new Criteria("_id").in(ids));
        UnwindOperation unwindSchedules = Aggregation.unwind("schedules");

        Aggregation aggregation = Aggregation.newAggregation(
                matchClass,
                unwindSchedules,
                Aggregation.project("_id", "courseId", "courseName", "schedules").and("_id").as("classId")
        );

        return mongoTemplate.aggregate(aggregation, "classSchedule", QueryClassSchedule.class).getMappedResults();
    }

    @Override
    public void changeSchedule(ChangeScheduleRequest request) {
        Query query = new Query();
        query.addCriteria(Criteria.where("studentId").is(request.studentId()).and("classId").is(request.oldClassId()));

        Update update = new Update();
        update.set("classId", request.newClassId());

        mongoTemplate.updateFirst(query, update, StudentSchedule.class);
    }

    @Override
    public List<ConflictResponse> getScheduleConflicts(ScheduleConflictRequest request) {
        List<QueryClassSchedule> existingSchedules = getEachScheduleByClassIds(request.enrolledClassIds());
        List<QueryClassSchedule> newSchedules = getValidSchedules(request.newClassId(), request.groupId());

        return findConflicts(existingSchedules, newSchedules);
    }

    private List<ConflictResponse> findConflicts(List<QueryClassSchedule> existingSchedules, List<QueryClassSchedule> newSchedules) {
        List<ConflictResponse> conflicts = new ArrayList<>();
        for (QueryClassSchedule newSchedule : newSchedules) {
            for (QueryClassSchedule existingSchedule : existingSchedules) {
                if (isConflict(existingSchedule, newSchedule)) {
                    conflicts.add(new ConflictResponse(existingSchedule.classId(), existingSchedule.courseId(), existingSchedule.courseName(), existingSchedule.schedules(), newSchedule.classId(), newSchedule.courseId(), newSchedule.courseName(), newSchedule.schedules()));
                }
            }
        }
        return conflicts;
    }

    private List<QueryClassSchedule> getValidSchedules(String newClassId, int groupId) {
        List<QueryClassSchedule> schedules = getEachScheduleByClassIds(List.of(newClassId));
        return schedules.stream()
                .filter(schedule -> isValidSchedule(schedule, groupId))
                .toList();
    }

    private boolean isValidSchedule(QueryClassSchedule schedule, int groupId) {
        ClassType classType = schedule.schedules().getClassType();
        return  ClassType.THEORY == classType ||(classType != ClassType.NO_CLASS_DAY &&
                classType != ClassType.MID_TERM_EXAM &&
                classType != ClassType.FINAL_EXAM &&
                schedule.schedules().getGroup() == groupId);
    }

    private boolean isConflict(QueryClassSchedule existingSchedule, QueryClassSchedule newSchedule) {
        // Check if the schedules are on the same day of the week
        if (existingSchedule.schedules().getDayOfWeek() != newSchedule.schedules().getDayOfWeek()) {
            return false;
        }

        // Split the time slots into start and end times
        String[] existingTime = existingSchedule.schedules().getTimeSlot().split("-");
        String[] newTime = newSchedule.schedules().getTimeSlot().split("-");

        // Check if the schedules overlap in time
        if (Integer.parseInt(existingTime[0]) < Integer.parseInt(newTime[1]) &&
                Integer.parseInt(existingTime[1]) > Integer.parseInt(newTime[0])) {
            // If the schedules overlap in time, check if they also overlap in date
            return existingSchedule.schedules().getStartDate().before(newSchedule.schedules().getEndDate()) &&
                    existingSchedule.schedules().getEndDate().after(newSchedule.schedules().getStartDate());
        }

        return false;
    }
}
