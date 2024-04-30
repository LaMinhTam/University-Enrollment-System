package vn.edu.iuh.fit.enrollservice;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import vn.edu.iuh.fit.enrollservice.dtos.ClassType;
import vn.edu.iuh.fit.enrollservice.dtos.Course;
import vn.edu.iuh.fit.enrollservice.dtos.Schedule;
import vn.edu.iuh.fit.enrollservice.models.Class;
import vn.edu.iuh.fit.enrollservice.models.ClassStatus;
import vn.edu.iuh.fit.enrollservice.repositories.ClassRepository;

import java.text.SimpleDateFormat;
import java.util.*;

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
                "",
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
        List<Course> courses = List.of(
                new Course("4203002009", "Cấu trúc rời rạc", 0, 0, 0, null),
                new Course("4203003192", "Lý thuyết đồ thị", 0, 0, 0, null),
                new Course("4203003242", "Cấu trúc dữ liệu và giải thuật", 0, 0, 0, null),
                new Course("4203003259", "Hệ cơ sở dữ liệu", 0, 0, 0, null),
                new Course("4203003307", "Lập trình thiết bị di động", 0, 0, 0, null),
                new Course("4203003848", "Nhập môn Tin học", 0, 0, 0, null),
                new Course("4203014164", "Pháp luật đại cương", 0, 0, 0, null),
                new Course("4203014165", "Kỹ năng làm việc nhóm", 0, 0, 0, null),
                new Course("4203015253", "Hội họa", 0, 0, 0, null),
                new Course("4203000901", "Xã hội học", 0, 0, 0, null),
                new Course("4203000942", "Giao tiếp kinh doanh", 0, 0, 0, null),
                new Course("4203001146", "Kỹ năng xây dựng kế hoạch", 0, 0, 0, null),
                new Course("4203003196", "Phương pháp luận nghiên cứu khoa học", 0, 0, 0, null),
                new Course("4203003197", "Âm nhạc – Nhạc lý và Guitar căn bản", 0, 0, 0, null),
                new Course("4203003205", "Quản trị doanh nghiệp", 0, 0, 0, null),
                new Course("4203003206", "Môi trường và con người", 0, 0, 0, null),
                new Course("4203003217", "Quản trị học", 0, 0, 0, null),
                new Course("4203003285", "Giáo dục Quốc phòng và An ninh 1 ", 0, 0, 0, null),
                new Course("4203003288", "Tiếng Việt thực hành", 0, 0, 0, null),
                new Course("4203003591", "Toán cao cấp 1", 0, 0, 0, null),
                new Course("4203014193", "Kế toán cơ bản", 0, 0, 0, null),
                new Course("4203015254", "Toán cao cấp 2", 0, 0, 0, null),
                new Course("4203000908", "Giáo dục thể chất 1 ", 0, 0, 0, null),
                new Course("4203003194", "Tâm lý học đại cương", 0, 0, 0, null),
                new Course("4203003195", "Phát triển ứng dụng", 0, 0, 0, null),
                new Course("4203003198", "Lập trình hướng đối tượng", 0, 0, 0, null),
                new Course("4203003203", "Đảm bảo chất lượng và Kiểm thử phần mềm", 0, 0, 0, null),
                new Course("4203003245", "Lập trình WWW (Java)", 0, 0, 0, null),
                new Course("4203003325", "Phát triển ứng dụng Web với Qt Engine", 0, 0, 0, null),
                new Course("4203003501", "Nhập môn Lập trình", 0, 0, 0, null),
                new Course("4203010665", "Lập trình WWW (.NET)", 0, 0, 0, null),
                new Course("4203014167", "Cơ sở văn hóa Việt Nam", 0, 0, 0, null),
                new Course("4203014168", "Triết học Mác - Lênin", 0, 0, 0, null),
                new Course("4203001432", "Kinh tế chính trị Mác - Lênin", 0, 0, 0, null),
                new Course("4203002422", "Chủ nghĩa xã hội khoa học", 0, 0, 0, null),
                new Course("4203003592", "Mô hình hóa dữ liệu NoSQL MongoDB", 0, 0, 0, null),
                new Course("4203003621", "Kỹ năng sử dụng bàn phím và thiết bị văn phòng", 0, 0, 0, null),
                new Course("4203003774", "Tiếng Anh 1", 0, 0, 0, null),
                new Course("4203004147", "Tiếng Anh 2", 0, 0, 0, null),
                new Course("4203004323", "Thực tập doanh nghiệp", 0, 0, 0, null),
                new Course("4203014169", "Lập trình IoTs", 0, 0, 0, null),
                new Course("4203003098", "Lịch sử Đảng Cộng sản Việt Nam", 0, 0, 0, null),
                new Course("4203014170", "Khóa luận tốt nghiệp", 0, 0, 0, null)

//                new Course("4203000941", "Tư tưởng Hồ Chí Minh", 0, 0, 0, null),
//                new Course("4203002137", "Kỹ thuật điện tử", 0, 0, 0, null),
//                new Course("4203003193", "Kỹ thuật lập trình", 0, 0, 0, null),
//                new Course("4203003240", "Nhập môn an toàn thông tin", 0, 0, 0, null),
//                new Course("4203003306", "Mạng máy tính", 0, 0, 0, null),
//                new Course("4203003320", "Tương tác người máy", 0, 0, 0, null),
//                new Course("4203003345", "Công nghệ phần mềm", 0, 0, 0, null),
//                new Course("4203003354", "Hệ quản trị cơ sở dữ liệu", 0, 0, 0, null),
//                new Course("4203003395", "Automat & ngôn ngữ hình thức", 0, 0, 0, null),
//                new Course("4203001058", "Kiến trúc và Thiết kế phần mềm", 0, 0, 0, null),
//                new Course("4203001076", "Lập trình phân tích dữ liệu 1", 0, 0, 0, null),
//                new Course("4203001207", "Lập trình hướng sự kiện với công nghệ .NET", 0, 0, 0, null),
//                new Course("4203002044", "Lập trình hướng sự kiện với công nghệ Java", 0, 0, 0, null),
//                new Course("4203002070", "Hệ Thống Máy tính", 0, 0, 0, null),
//                new Course("4203002145", "Hệ Thống và Công nghệ Web", 0, 0, 0, null),
//                new Course("4203003436", "Lập trình phân tán với công nghệ Java", 0, 0, 0, null),
//                new Course("4203003442", "Nhập môn dữ liệu lớn", 0, 0, 0, null),
//                new Course("4203003753", "Lập trình phân tích dữ liệu 2", 0, 0, 0, null),
//                new Course("4203014166", "Lập trình phân tán với công nghệ .NET", 0, 0, 0, null),
//                new Course("4203000868", "Công nghệ mới trong phát triển ứng dụng CNTT", 0, 0, 0, null),
//                new Course("4203001004", "Toán ứng dụng", 0, 0, 0, null),
//                new Course("4203001111", "Hàm phức và phép biến đổi Laplace", 0, 0, 0, null),
//                new Course("4203002031", "Giáo dục thể chất 2 ", 0, 0, 0, null),
//                new Course("4203002146", "Phương pháp tính", 0, 0, 0, null),
//                new Course("4203002349", "Vật lý đại cương", 0, 0, 0, null),
//                new Course("4203003347", "Những vấn đề xã hội và đạo đức nghề nghiệp", 0, 0, 0, null),
//                new Course("4203003443", "Giáo dục quốc phòng và an ninh 2", 0, 0, 0, null),
//                new Course("4203003451", "Logic học", 0, 0, 0, null),
//                new Course("4203003773", "Thương mại điện tử", 0, 0, 0, null),
//                new Course("4203000664", "Lập trình GUI với Qt Framework", 0, 0, 0, null),
//                new Course("4203001366", "Khai thác dữ liệu và ứng dụng", 0, 0, 0, null),
//                new Course("4203001549", "Thống kê máy tính và ứng dụng", 0, 0, 0, null),
//                new Course("4203002329", "Tiếp thị điện tử", 0, 0, 0, null),
//                new Course("4203002330", "Phân tích thiết kế hệ thống", 0, 0, 0, null),
//                new Course("4203003147", "Kiến trúc hướng dịch vụ và Điện toán đám mây", 0, 0, 0, null),
//                new Course("4203003453", "Lập trình mạng với Qt Framework", 0, 0, 0, null),
//                new Course("4203003758", "Lập trình thiết bị di động nâng cao", 0, 0, 0, null),
//                new Course("4203003775", "Quản lý dự án CNTT", 0, 0, 0, null),
//                new Course("4203004056", "Hệ quản trị cơ sở dữ liệu NoSQL MongoDB", 0, 0, , null)
        );
        courses.forEach(course -> {
            int year = 2024;
            int semester = 1;
            classes.addAll(generateRandomClasses(course, year, semester));
        });
        classRepository.saveAll(classes);
    }

    public static List<Class> generateRandomClasses(Course course, int year, int semester) {
        List<Class> classes = new ArrayList<>();
        int count = random.nextInt(4) + 1; // Generate random number of classes between 1 and 4
        for (int i = 0; i < count; i++) {
            String classId = generateClassId(course.id(), year, semester, i + 1);
            String status = ClassStatus.values()[random.nextInt(ClassStatus.values().length)].name();
            int maxCapacity = (random.nextInt(3) + 6) * 10; // Generate max capacity between 60, 70, and 80
            Class newClass = new Class(classId, course.id(), course.name(), semester, year, maxCapacity, ClassStatus.valueOf(status));
            List<Schedule> schedules = generateSchedules(classId);
            System.out.println("{" +
                    "\"classId\":\"" + classId + "\"," +
                    "\"courseId\":\"" + course.id() + "\"," +
                    "\"courseName\":\"" + course.name() + "\"," +
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
                    printDayOff(s) +
                    "}";
            if (schedule.indexOf(s) != schedule.size() - 1)
                result[0] += ",";
        });
        return result[0];
    }

    private static String printDayOff(Schedule schedule) {
        if (schedule.classType() == ClassType.MID_TERM_EXAM || schedule.classType() == ClassType.FINAL_EXAM) {
            return "";
        }
        List<Date> dates = schedule.dayOff();
        final String[] result = {""};
        result[0] = ",\"dayOff\":[";
        dates.forEach(d -> {
            result[0] += toISODate(d);
            if (dates.indexOf(d) != dates.size() - 1)
                result[0] += ",";
        });
        result[0] += "]";
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
        int numSchedules = random.nextInt(2) + 3; // Randomly choose between 3 and 4 schedules per class

        // Ensure at least one MIDTERM_EXAM and FINAL_EXAM
        int numExams = random.nextInt(3) + 1; // Randomly choose between 1 and 3 exams

        for (int i = 0; i < numExams; i++) {
            schedules.add(generateExamSchedule(ClassType.MID_TERM_EXAM, new Date(2023, 10, 2), new Date(2023, 10, 15)));
            schedules.add(generateSchedule(ClassType.FINAL_EXAM, new Date(2023, 12, 4), new Date(2023, 12, 17)));
//            schedules.add(generateExamSchedule(ClassType.MID_TERM_EXAM, new Date(2024, 3, 18), new Date(2024, 3, 31)));
//            schedules.add(generateSchedule(ClassType.FINAL_EXAM, new Date(2024, 5, 12), new Date(2024, 6, 2)));
        }

        for (int i = 2; i < numSchedules; i++) {
            ClassType classType = (i % 2 == 0) ? ClassType.THEORY : ClassType.PRACTICE;
            Date startDate = generateDate(31, 7, 2023, 13, 8, 2023); // Generate random start date
            Date endDate = generateDate(20, 11, 2023, 3, 12, 2023); // Generate random end date
//            Date startDate = generateDate(25, 12, 2023, 7, 1, 2024); // Generate random start date
//            Date endDate = generateDate(22, 4, 2024, 5, 4, 2024); // Generate random end date
            schedules.add(generateSchedule(classType, startDate, endDate));
        }

        return schedules;
    }

    private static Schedule generateExamSchedule(ClassType classType, Date examWeekStartDate, Date examWeekEndDate) {
        int dayOfWeek = random.nextInt(7) + 1; // Random day of the week (1 to 7)
        String timeSlot = generateTimeSlot(); // Generate random time slot

        Date examDate = generateExamDate(examWeekStartDate, examWeekEndDate); // Generate random exam date within exam week

        String room = generateRoom(); // Generate random room
        String location = generateLocation(); // Generate random location
        String lecturer = generateLecturer(); // Generate random lecturer

        List<Date> daysOff = new ArrayList<>(); // No days off for exams

        return new Schedule(dayOfWeek, timeSlot, examDate, examDate, room, location, lecturer, classType, daysOff);
    }

    private static Date generateExamDate(Date examWeekStartDate, Date examWeekEndDate) {
        long startMillis = examWeekStartDate.getTime();
        long endMillis = examWeekEndDate.getTime();
        long randomMillis = startMillis + ((long) (random.nextDouble() * (endMillis - startMillis)));

        Calendar cal = Calendar.getInstance();
        cal.setTimeInMillis(randomMillis);
        return cal.getTime();
    }

    private static Schedule generateSchedule(ClassType classType, Date startDate, Date endDate) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(startDate);
        int dayOfWeek = cal.get(Calendar.DAY_OF_WEEK);
        String timeSlot = generateTimeSlot(); // Generate random time slot

        String room = generateRoom(); // Generate random room
        String location = generateLocation(); // Generate random location
        String lecturer = generateLecturer(); // Generate random lecturer

        List<Date> daysOff = generateDaysOff(startDate, dayOfWeek);

        return new Schedule(dayOfWeek, timeSlot, startDate, endDate, room, location, lecturer, classType, daysOff);
//        return new Schedule(dayOfWeek, timeSlot, startDate, endDate, room, location, lecturer, classType);
    }

    private static List<Date> generateDaysOff(Date startDate, int dayOfWeek) {
        Calendar cal = Calendar.getInstance();

        cal.setTime(startDate);
        List<Date> daysOff = new ArrayList<>();
        int numDaysOff = random.nextInt(5); // Randomly choose between 0 and 4 days off

        for (int i = 0; i < numDaysOff; i++) {
            cal.add(Calendar.WEEK_OF_YEAR, 1); // Add one week to the start date
            daysOff.add(cal.getTime());
        }

        return daysOff;
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
