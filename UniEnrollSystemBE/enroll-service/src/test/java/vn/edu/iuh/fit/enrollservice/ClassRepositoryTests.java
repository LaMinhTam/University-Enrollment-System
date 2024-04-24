package vn.edu.iuh.fit.enrollservice;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import vn.edu.iuh.fit.enrollservice.dtos.ClassSchedule;
import vn.edu.iuh.fit.enrollservice.dtos.ClassType;
import vn.edu.iuh.fit.enrollservice.dtos.Schedule;
import vn.edu.iuh.fit.enrollservice.models.Class;
import vn.edu.iuh.fit.enrollservice.models.ClassStatus;
import vn.edu.iuh.fit.enrollservice.repositories.ClassRepository;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Random;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Rollback(false)
public class ClassRepositoryTests {
    @Autowired
    private ClassRepository classRepository;

    @Test
    public void createClass() {
        Class savedClass = classRepository.save(new Class(
                "662865e87b28f631d6ad1fbf",
                "4203000664",
                1,
                2021,
                50,
                ClassStatus.WAITING
        ));
        assertThat(savedClass).isNotNull();
    }

    private static final Random random = new Random();

    @Test
    public void generateData() {
        List<Class> classes = new ArrayList<>();
        List<String> courseIds = List.of(
//                "4203002009",
//                "4203003192",
//                "4203003242",
//                "4203003259",
//                "4203003307",
//                "4203003848",
//                "4203014164",
//                "4203014165",
//                "4203015253",
//                "4203000901",
//                "4203000942",
//                "4203001146",
//                "4203003196",
//                "4203003197",
//                "4203003205",
//                "4203003206",
//                "4203003217",
//                "4203003285",
//                "4203003288",
//                "4203003591",
//                "4203014193",
//                "4203015254",
//                "4203000908",
//                "4203003194",
//                "4203003195",
//                "4203003198",
//                "4203003203",
//                "4203003245",
//                "4203003325",
//                "4203003501",
//                "4203010665",
//                "4203014167",
//                "4203014168",
//                "4203001432",
//                "4203002422",
//                "4203003592",
//                "4203003621",
//                "4203003774",
//                "4203004147",
//                "4203004323",
//                "4203014169",
//                "4203003098",
//                "4203014170"


                "4203000941",
                "4203002137",
                "4203003193",
                "4203003240",
                "4203003306",
                "4203003320",
                "4203003345",
                "4203003354",
                "4203003395",
                "4203001058",
                "4203001076",
                "4203001207",
                "4203002044",
                "4203002070",
                "4203002145",
                "4203003436",
                "4203003442",
                "4203003753",
                "4203014166",
                "4203000868",
                "4203001004",
                "4203001111",
                "4203002031",
                "4203002146",
                "4203002349",
                "4203003347",
                "4203003443",
                "4203003451",
                "4203003773",
                "4203000664",
                "4203001366",
                "4203001549",
                "4203002329",
                "4203002330",
                "4203003147",
                "4203003453",
                "4203003758",
                "4203003775",
                "4203004056"
        );
        courseIds.forEach(courseId -> {
            int year = 2024;
            int semester = 2;
            classes.addAll(generateRandomClasses(courseId, year, semester));
        });
        classRepository.saveAll(classes);
    }

    public static List<Class> generateRandomClasses(String courseId, int year, int semester) {
        List<Class> classes = new ArrayList<>();
        int count = random.nextInt(4) + 1; // Generate random number of classes between 1 and 4
        for (int i = 0; i < count; i++) {
            String classId = generateClassId(courseId, year, semester, i + 1);
            String status = ClassStatus.values()[random.nextInt(ClassStatus.values().length)].name();
            int maxCapacity = (random.nextInt(3) + 6) * 10; // Generate max capacity between 60, 70, and 80
            Class newClass = new Class(classId, courseId, semester, year, maxCapacity, ClassStatus.valueOf(status));
            List<Schedule> schedules = generateSchedules(classId);
            System.out.println("{" +
                    "\"classId\":\"" + classId + "\"," +
                    "\"schedules\":" + "[" +
                    printSchedule(schedules) +
                    "]" +
                    "},");
            classes.add(newClass);
        }
        return classes;
    }

    private static String printSchedule(List<Schedule> schedule) {
        final String[] result = {""};
        schedule.forEach(s -> {
            //date to ISODate
            result[0] += "{" +
                    "\"dayOfWeek\":" + s.dayOfWeek() + "," +
                    "\"timeSlot\":\"" + s.timeSlot() + "\"," +
                    "\"startDate\":" + toISODate(s.startDate()) + "," +
                    "\"endDate\":" + toISODate(s.endDate()) + "," +
                    "\"room\":\"" + s.room() + "\"," +
                    "\"location\":\"" + s.location() + "\"," +
                    "\"lecturer\":\"" + s.lecturer() + "\"," +
                    "\"classType\":\"" + s.classType() + "\"" +
                    "}";
            if(schedule.indexOf(s) != schedule.size() - 1)
                result[0] += ",";
        });
        return result[0];
    }

    public static String toISODate(Date date) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
        return "{\"$date\":\"" + sdf.format(date) + "\"}";
    }

    private static String generateClassId(String courseIdPart, int year, int semester, int count) {
        String yearPart = String.valueOf(year).substring(2); // Get the last two digits of the year
        return courseIdPart + yearPart + semester + String.format("%02d", count); // Format the class ID
    }

    private static List<Schedule> generateSchedules(String classId) {
        List<Schedule> schedules = new ArrayList<>();
        int numSchedules = random.nextInt(2) + 1; // Randomly choose 1 or 2 schedules per class
        for (int i = 0; i < numSchedules; i++) {
            int dayOfWeek = random.nextInt(7); // Random day of the week (0 to 6)
            String timeSlot = generateTimeSlot(); // Generate random time slot
            Date startDate = generateDate(25, 12, 2023, 7, 1, 2024); // Generate random start date
            Date endDate = generateDate(22, 4, 2024, 5, 4, 2024); // Generate random end date
            String room = generateRoom(); // Generate random room
            String location = generateLocation(); // Generate random location
            String lecturer = generateLecturer(); // Generate random lecturer
            ClassType classType = random.nextBoolean() ? ClassType.THEORY : ClassType.PRACTICE; // Random class type
            Schedule schedule = new Schedule(dayOfWeek, timeSlot, startDate, endDate, room, location, lecturer, classType);
            schedules.add(schedule);
        }
        return schedules;
    }

    private static String generateTimeSlot() {
        int startSlot = random.nextInt(5) * 3 + 1; // Random start time slot (1, 4, 7, 10, 13)
        int endSlot = startSlot + 2; // End time slot is start slot + 2
        return startSlot + "-" + endSlot;
    }

    private static Date generateDate(int startDay, int startMonth, int startYear, int endDay, int endMonth, int endYear) {
        long startDateMillis = new Date(startYear - 1900, startMonth - 1, startDay).getTime();
        long endDateMillis = new Date(endYear - 1900, endMonth - 1, endDay).getTime();
        long randomDateMillis = random.nextLong() % (endDateMillis - startDateMillis) + startDateMillis;
        return new Date(randomDateMillis);
    }

    private static String generateRoom() {
        char floor = (char) (random.nextInt(4) + 'A'); // Random floor (A to D)
        int roomNumber = random.nextInt(10) + 1; // Random room number (1 to 10)
        return floor + String.format("%02d", roomNumber);
    }

    private static String generateLocation() {
        // Sample locations for demonstration purposes
        String[] locations = {"53 Phạm Văn Chiêu, Phường 9", "12 Nguyễn Văn Bảo Phường 4"};
        return locations[random.nextInt(locations.length)];
    }

    private static String generateLecturer() {
        // Sample Vietnamese names for demonstration purposes
        String[] names = {"Nguyễn Văn A", "Trần Thị B", "Lê Văn C", "Phạm Thị D", "Hoàng Văn E"};
        return names[random.nextInt(names.length)];
    }
}
