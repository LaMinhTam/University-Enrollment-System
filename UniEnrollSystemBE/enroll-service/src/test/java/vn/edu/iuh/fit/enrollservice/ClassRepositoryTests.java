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
    static int year = 2021;
    int semester = 2;
    static int startStudyMonth =
            Calendar.JANUARY;
    static int endStudyMonth =
            Calendar.APRIL;
    static int examMiddleMonth =
            Calendar.MARCH;
    static int examFinalMonth =
            Calendar.MAY;
    static Date startDateMiddleExam = new Date(year - 1900, examMiddleMonth, 2);
    static Date endDateMiddleExam = new Date(year - 1900, examMiddleMonth, 15);
    private static final Date startDateFinalExam = new Date(year - 1900, examFinalMonth, 4);
    private static final Date endDateFinalExam = new Date(year - 1900, examFinalMonth, 17);
    static Date firstStartStudyDate = new Date(year - 1900, startStudyMonth, 25);
    static Date secondStartStudyDate = new Date(year - 1900, startStudyMonth, 1);
    static Date firstEndStudyDate = new Date(year - 1900, endStudyMonth, 22);
    static Date secondEndStudyDate = new Date(year - 1900, endStudyMonth, 5);

    @Test
    public void generateData() {
        List<Class> classes = new ArrayList<>();
        List<Course> courses = List.of(
                new Course("4203002009", "Nhập môn Tin học", 2, 2, 0, 0, null, 0.0),
                new Course("4203003192", "Kỹ năng làm việc nhóm", 2, 2, 0, 0, null, 0.0),
                new Course("4203003242", "Giáo dục Quốc phòng và An ninh 1 ", 4, 4, 0, 0, null, 0.0),
                new Course("4203003259", "Toán cao cấp 1", 2, 2, 0, 0, null, 0.0),
                new Course("4203003307", "Giáo dục thể chất 1 ", 2, 0, 2, 0, null, 0.0),
                new Course("4203003848", "Nhập môn Lập trình", 2, 0, 2, 0, null, 0.0),
                new Course("4203014164", "Triết học Mác - Lênin", 3, 3, 0, 0, null, 0.0),
                new Course("4203014165", "Kinh tế chính trị Mác - Lênin", 2, 2, 0, 0, null, 0.0),
                new Course("4203015253", "Tiếng Anh 1", 3, 3, 0, 0, null, 0.0),
                new Course("4203000901", "Cấu trúc rời rạc", 3, 3, 0, 0, null, 0.0),
                new Course("4203000942", "Cấu trúc dữ liệu và giải thuật", 4, 3, 1, 0, null, 0.0),
                new Course("4203001146", "Hệ cơ sở dữ liệu", 4, 3, 1, 0, null, 0.0),
                new Course("4203003196", "Giao tiếp kinh doanh", 3, 3, 0, 0, null, 0.0),
                new Course("4203003197", "Kỹ năng xây dựng kế hoạch", 3, 3, 0, 0, null, 0.0),
                new Course("4203003205", "Quản trị doanh nghiệp", 3, 3, 0, 0, null, 0.0),
                new Course("4203003206", "Môi trường và con người", 3, 3, 0, 0, null, 0.0),
                new Course("4203003217", "Quản trị học", 3, 3, 0, 0, null, 0.0),
                new Course("4203003285", "Kế toán cơ bản", 3, 3, 0, 0, null, 0.0),
                new Course("4203003288", "Toán cao cấp 2", 2, 2, 0, 0, null, 0.0),
                new Course("4203003591", "Lập trình hướng đối tượng", 3, 2, 1, 0, null, 0.0),
                new Course("4203014193", "Kỹ năng sử dụng bàn phím và thiết bị văn phòng", 3, 3, 0, 0, null,0.0),
                new Course("4203015254", "Tiếng Anh 2", 30, 3, 0, 0, null,0.0),
                new Course("4203000908", "Lý thuyết đồ thị", 3, 3, 0, 0, null,0.0),
                new Course("4203003194", "Hội họa", 3, 3, 0, 0, null,0.0),
                new Course("4203003195", "Xã hội học", 3, 3, 0, 0, null,0.0),
                new Course("4203003198", "Phương pháp luận nghiên cứu khoa học", 2, 2, 0, 0, null,0.0),
                new Course("4203003203", "Âm nhạc – Nhạc lý và Guitar căn bản", 3, 3, 0, 0, null,0.0),
                new Course("4203003245", "Tiếng Việt thực hành", 3, 3, 0, 0, null,0.0),
                new Course("4203003325", "Tâm lý học đại cương", 3, 3, 0, 0, null,0.0),
                new Course("4203003501", "Phát triển ứng dụng", 3, 2, 1, 0, null,0.0),
                new Course("4203010665", "Cơ sở văn hóa Việt Nam", 3, 3, 0, 0, null,0.0),
                new Course("4203014167", "Chủ nghĩa xã hội khoa học", 2, 2, 0, 0, null,0.0),
                new Course("4203014168", "Mô hình hóa dữ liệu NoSQL MongoDB", 3, 3, 0, 0, null,0.0),
                new Course("4203001432", "Lập trình thiết bị di động", 4, 3, 1, 0, null,0.0),
                new Course("4203002422", "Pháp luật đại cương", 2, 2, 0, 0, null,0.0),
                new Course("4203003592", "Đảm bảo chất lượng và Kiểm thử phần mềm", 3, 2, 1, 0, null,0.0),
                new Course("4203003621", "Lập trình WWW (Java)", 4, 3, 1, 0, null,0.0),
                new Course("4203003774", "Phát triển ứng dụng Web với Qt Engine", 4, 3, 1, 0, null,0.0),
                new Course("4203004147", "Lập trình WWW (.NET)", 4, 3, 1, 0, null,0.0),
                new Course("4203004323", "Lập trình IoTs", 4, 2, 2, 0, null,0.0),
                new Course("4203014169", "Lịch sử Đảng Cộng sản Việt Nam", 2, 2, 0, 0, null,0.0),
                new Course("4203003098", "Thực tập doanh nghiệp", 5, 0, 5, 0, null, 0.0),
                new Course("4203014170", "Khóa luận tốt nghiệp", 8, 8, 0, 0, null, 0.0)

//                new Course("4203000941", "Kỹ thuật lập trình", 3, 1, 2, 1, null),
//                new Course("4203002137", "Hệ Thống Máy tính", 4, 1, 3, 1, null),
//                new Course("4203003193", "Toán ứng dụng", 3, 3, 0, 1, null),
//                new Course("4203003240", "Hàm phức và phép biến đổi Laplace", 3, 3, 0, 1, null),
//                new Course("4203003306", "Giáo dục thể chất 2 ", 2, 0, 2, 1, null),
//                new Course("4203003320", "Phương pháp tính", 3, 3, 0, 1, null),
//                new Course("4203003345", "Vật lý đại cương", 3, 3, 0, 1, null),
//                new Course("4203003354", "Giáo dục quốc phòng và an ninh 2", 4, 2, 2, 1, null),
//                new Course("4203003395", "Logic học", 3, 3, 0, 1, null),
//                new Course("4203001058", "Mạng máy tính", 3, 3, 0, 1, null),
//                new Course("4203001076", "Tương tác người máy", 3, 3, 0, 1, null),
//                new Course("4203001207", "Hệ quản trị cơ sở dữ liệu", 3, 2, 1, 1, null),
//                new Course("4203002044", "Lập trình hướng sự kiện với công nghệ .NET", 4, 3, 1, 1, null),
//                new Course("4203002070", "Lập trình hướng sự kiện với công nghệ Java", 4, 3, 1, 1, null),
//                new Course("4203002145", "Hệ Thống và Công nghệ Web", 3, 2, 1, 1, null),
//                new Course("4203003436", "Thương mại điện tử", 3, 2, 1, 1, null),
//                new Course("4203003442", "Lập trình GUI với Qt Framework", 4, 3, 1, 1, null),
//                new Course("4203003753", "Phân tích thiết kế hệ thống", 3, 2, 1, 1, null),
//                new Course("4203014166", "Hệ quản trị cơ sở dữ liệu NoSQL MongoDB", 3, 2, 1, 1, null),
//                new Course("4203000868", "Kỹ thuật điện tử", 3, 2, 1, 1, null),
//                new Course("4203001004", "Nhập môn an toàn thông tin", 3, 3, 0, 1, null),
//                new Course("4203001111", "Công nghệ phần mềm", 3, 3, 0, 1, null),
//                new Course("4203002031", "Lập trình phân tích dữ liệu 1", 3, 2, 1, 1, null),
//                new Course("4203002146", "Lập trình phân tán với công nghệ Java", 3, 2, 1, 1, null),
//                new Course("4203002349", "Lập trình phân tán với công nghệ .NET", 3, 2, 1, 1, null),
//                new Course("4203003347", "Những vấn đề xã hội và đạo đức nghề nghiệp", 3, 3, 0, 1, null),
//                new Course("4203003443", "Khai thác dữ liệu và ứng dụng", 3, 2, 1, 1, null),
//                new Course("4203003451", "Thống kê máy tính và ứng dụng", 3, 2, 1, 1, null),
//                new Course("4203003773", "Lập trình mạng với Qt Framework", 3, 2, 1, 1, null),
//                new Course("4203000664", "Tư tưởng Hồ Chí Minh", 2, 2, 0, 1, null),
//                new Course("4203001366", "Automat & ngôn ngữ hình thức", 3, 3, 0, 1, null),
//                new Course("4203001549", "Kiến trúc và Thiết kế phần mềm", 4, 3, 1, 1, null),
//                new Course("4203002329", "Nhập môn dữ liệu lớn", 3, 2, 1, 1, null),
//                new Course("4203002330", "Lập trình phân tích dữ liệu 2", 3, 2, 1, 1, null),
//                new Course("4203003147", "Công nghệ mới trong phát triển ứng dụng CNTT", 3, 2, 1, 1, null),
//                new Course("4203003453", "Tiếp thị điện tử", 3, 2, 1, 1, null),
//                new Course("4203003758", "Kiến trúc hướng dịch vụ và Điện toán đám mây", 3, 2, 1, 1, null),
//                new Course("4203003775", "Lập trình thiết bị di động nâng cao", 3, 2, 1, 1, null),
//                new Course("4203004056", "Quản lý dự án CNTT", 3, 2, 1, 1, null)
        );
        for (int i = 0; i < 4; i++) {
            startDateMiddleExam.setYear(startDateMiddleExam.getYear() + i);
            endDateMiddleExam.setYear(endDateMiddleExam.getYear() + i);
            startDateFinalExam.setYear(startDateFinalExam.getYear() + i);
            endDateFinalExam.setYear(endDateFinalExam.getYear() + i);
            firstStartStudyDate.setYear(firstStartStudyDate.getYear() + i);
            secondStartStudyDate.setYear(secondStartStudyDate.getYear() + i);
            firstEndStudyDate.setYear(firstEndStudyDate.getYear() + i);
            secondEndStudyDate.setYear(secondEndStudyDate.getYear() + i);
            int finalI = i;
            courses.forEach(course -> {
                if (course.getType() == 0) {
                    startStudyMonth = Calendar.AUGUST;
                    endStudyMonth = Calendar.NOVEMBER;
                    examMiddleMonth = Calendar.OCTOBER;
                    examFinalMonth = Calendar.DECEMBER;
                    semester = 1;
                } else {
                    startStudyMonth = Calendar.JANUARY;
                    endStudyMonth = Calendar.APRIL;
                    examMiddleMonth = Calendar.MARCH;
                    examFinalMonth = Calendar.MAY;
                    semester = 2;
                }
                classes.addAll(generateRandomClasses(course, year + finalI, semester));
            });
            classRepository.saveAll(classes);
        }
    }

    public static List<Class> generateRandomClasses(Course course, int year, int semester) {
        List<Class> classes = new ArrayList<>();
        int count = random.nextInt(4) + 1; // Generate random number of classes between 1 and 4
        for (int i = 0; i < count; i++) {
            String classId = generateClassId(course.getId(), year, semester, i + 1);
            String status = ClassStatus.values()[random.nextInt(ClassStatus.values().length)].name();
            int maxCapacity = (random.nextInt(3) + 6) * 10; // Generate max capacity between 60, 70, and 80
            Class newClass = new Class(classId, course.getId(), course.getName(), semester, year, maxCapacity, ClassStatus.valueOf(status));
            List<Schedule> schedules = generateSchedules(course);
            System.out.println("{" +
                    "\"_id\":\"" + classId + "\"," +
                    "\"courseId\":\"" + course.getId() + "\"," +
                    "\"courseName\":\"" + course.getName() + "\"," +
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
                    "\"group\":" + s.group() + "," +
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
        return "new Date(\"" + sdf.format(date) + "\")";
    }

    private static String generateClassId(String courseIdPart, int year, int semester, int count) {
        String yearPart = String.valueOf(year).substring(2); // Get the last two digits of the year
        return courseIdPart + yearPart + semester + String.format("%02d", count); // Format the class ID
    }

    private static List<Schedule> generateSchedules(Course course) {
        List<Schedule> schedules = new ArrayList<>();
        int numSchedules = random.nextInt(2) + 3; // Randomly choose between 3 and 4 schedules per class
        // Ensure at least one MIDTERM_EXAM and FINAL_EXAM
        int numExams = random.nextInt(3) + 1; // Randomly choose between 1 and 3 exams

        for (int i = 1; i <= numExams; i++) {
            schedules.add(generateExamSchedule(i, ClassType.MID_TERM_EXAM, startDateMiddleExam, endDateMiddleExam));
            schedules.add(generateExamSchedule(i, ClassType.FINAL_EXAM, startDateFinalExam, endDateFinalExam));
        }
        int group = 0;
        for (int i = 2; i < numSchedules; i++) {
            Date startDate = generateDate(firstStartStudyDate, secondStartStudyDate); // Generate random start date
            Date endDate = generateDate(firstEndStudyDate, secondEndStudyDate); // Generate random end date
            schedules.add(generateSchedule(group, ClassType.THEORY, startDate, endDate));
        }
        if (course.getPracticalCredit() != 0) {
            for (int i = 0; i < 3; i++) {
                group++;
                Date startDate = generateDate(firstStartStudyDate, secondStartStudyDate); // Generate random start date
                Date endDate = generateDate(firstEndStudyDate, secondEndStudyDate); // Generate random end date
                schedules.add(generateSchedule(group, ClassType.PRACTICE, startDate, endDate));
            }
        }

        return schedules;
    }

    private static Schedule generateExamSchedule(int group, ClassType classType, Date examWeekStartDate, Date examWeekEndDate) {
        int dayOfWeek = random.nextInt(7) + 1; // Random day of the week (1 to 7)
        String timeSlot = generateTimeSlot(); // Generate random time slot

        Date examDate = generateExamDate(examWeekStartDate, examWeekEndDate); // Generate random exam date within exam week

        String room = generateRoom(); // Generate random room
        String location = generateLocation(); // Generate random location
        String lecturer = generateLecturer(); // Generate random lecturer

        List<Date> daysOff = new ArrayList<>(); // No days off for exams

        return new Schedule(dayOfWeek, timeSlot, examDate, examDate, room, location, lecturer, classType, group, daysOff);
    }

    private static Date generateExamDate(Date examWeekStartDate, Date examWeekEndDate) {
        long startMillis = examWeekStartDate.getTime();
        long endMillis = examWeekEndDate.getTime();
        long randomMillis = startMillis + ((long) (random.nextDouble() * (endMillis - startMillis)));

        Calendar cal = Calendar.getInstance();
        cal.setTimeInMillis(randomMillis);
        return cal.getTime();
    }

    private static Schedule generateSchedule(int practicalgroup, ClassType classType, Date startDate, Date endDate) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(startDate);
        int dayOfWeek = cal.get(Calendar.DAY_OF_WEEK);
        String timeSlot = generateTimeSlot(); // Generate random time slot

        String room = generateRoom(); // Generate random room
        String location = generateLocation(); // Generate random location
        String lecturer = generateLecturer(); // Generate random lecturer

        List<Date> daysOff = generateDaysOff(startDate, dayOfWeek);

        return new Schedule(dayOfWeek, timeSlot, startDate, endDate, room, location, lecturer, classType, practicalgroup, daysOff);
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

    private static Date generateDate(Date firstStudyDate, Date secondStudyDate) {
        long startDateMillis = firstStudyDate.getTime();
        long endDateMillis = secondStudyDate.getTime();
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
