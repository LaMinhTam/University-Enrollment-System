package vn.edu.iuh.fit.scheduleservice.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.*;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.scheduleservice.dtos.DateRequest;
import vn.edu.iuh.fit.scheduleservice.dtos.QueryClassSchedule;
import vn.edu.iuh.fit.scheduleservice.models.ClassSchedule;
import vn.edu.iuh.fit.scheduleservice.models.Schedule;
import vn.edu.iuh.fit.scheduleservice.models.StudentSchedule;
import vn.edu.iuh.fit.scheduleservice.repositories.ClassScheduleRepository;
import vn.edu.iuh.fit.scheduleservice.repositories.StudentScheduleRepository;
import vn.edu.iuh.fit.scheduleservice.services.ClassScheduleService;

import java.text.ParseException;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

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
    public List<ClassSchedule> registrySchedule(String studentId, String courseId) {
        StudentSchedule studentSchedule = studentScheduleRepository.save(new StudentSchedule(studentId, courseId));
        return classScheduleRepository.findByClassIdIn(List.of(studentSchedule.getClassId()));
    }

    @Override
    public void cancelSchedule(String studentId, String classId) {
        studentScheduleRepository.deleteByStudentIdAndClassId(studentId, classId);
    }

    @Override
    public List<ClassSchedule> getScheduleByClassIds(List<String> ids) {
        return classScheduleRepository.findByClassIdIn(ids);
    }

    @Override
    public Map<Integer, List<Schedule>> getScheduleByDate(DateRequest dateRequest) throws ParseException {
        Calendar cal = Calendar.getInstance();
        cal.set(dateRequest.year(),
                dateRequest.month() - 1,
                dateRequest.day());

        cal.set(Calendar.DAY_OF_WEEK, Calendar.MONDAY);
        Date startDate = cal.getTime();

        cal.add(Calendar.WEEK_OF_YEAR, 1);
        cal.add(Calendar.DAY_OF_YEAR, -1);
        Date endDate = cal.getTime();

        MatchOperation matchStudent = Aggregation.match(new Criteria("studentId").is("21023911"));
        LookupOperation lookupSchedule = LookupOperation.newLookup()
                .from("classSchedule")
                .localField("classId")
                .foreignField("classId")
                .as("classSchedule");
        UnwindOperation unwindSchedule = Aggregation.unwind("classSchedule");
        UnwindOperation unwindSchedules = Aggregation.unwind("classSchedule.schedules");
        MatchOperation matchDate = Aggregation.match(new Criteria().andOperator(
                Criteria.where("classSchedule.schedules.startDate").lte(endDate),
                Criteria.where("classSchedule.schedules.endDate").gte(startDate)
        ));

        ProjectionOperation projectFields = Aggregation.project("studentId", "classId", "classSchedule.schedules");

        Aggregation aggregation = Aggregation.newAggregation(
                matchStudent,
                lookupSchedule,
                unwindSchedule,
                unwindSchedules,
                matchDate,
                projectFields
        );

        List<QueryClassSchedule> queryClassScheduleList = mongoTemplate.aggregate(aggregation, "studentSchedule", QueryClassSchedule.class).getMappedResults();

        // Create a map with keys from 1 to 7 and empty lists as values
        Map<Integer, List<Schedule>> weeklySchedule = IntStream.rangeClosed(0, 6)
                .boxed()
                .collect(Collectors.toMap(i -> i, i -> new ArrayList<>()));

        // Populate the map with schedules
        for (QueryClassSchedule queryClassSchedule : queryClassScheduleList) {
            int dayOfWeek = queryClassSchedule.schedules().getDayOfWeek();
            weeklySchedule.get(dayOfWeek).add(queryClassSchedule.schedules());
        }

        return weeklySchedule;
    }
}
