package vn.edu.iuh.fit.grademanagementservice;


import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.util.Pair;
import org.springframework.test.annotation.Rollback;
import vn.edu.iuh.fit.grademanagementservice.models.Course;
import vn.edu.iuh.fit.grademanagementservice.models.CourseReportStatus;
import vn.edu.iuh.fit.grademanagementservice.models.GradeReport;
import vn.edu.iuh.fit.grademanagementservice.models.SemesterSummary;
import vn.edu.iuh.fit.grademanagementservice.repositories.GradeReportRepository;
import vn.edu.iuh.fit.grademanagementservice.repositories.SemesterSummaryRepository;

import java.util.*;
import java.util.stream.Collectors;

@SpringBootTest
@Rollback(false)
public class GradeReportRepositoryTests {
    @Autowired
    private GradeReportRepository gradeReportRepository;

    @Autowired
    private SemesterSummaryRepository semesterSummaryRepository;

    @Test
    public void autoGenerateGradeReport() {
        List<Course> courses = List.of(
                new Course("4203002009", "Nhập môn Tin học", 2, 2, 0, 0),
                new Course("4203003192", "Kỹ năng làm việc nhóm", 2, 2, 0, 0),
                new Course("4203003242", "Giáo dục Quốc phòng và An ninh 1 ", 4, 4, 0, 0),
                new Course("4203003259", "Toán cao cấp 1", 2, 2, 0, 0),
                new Course("4203003307", "Giáo dục thể chất 1 ", 2, 0, 2, 0),
                new Course("4203003848", "Nhập môn Lập trình", 2, 0, 2, 0),
                new Course("4203014164", "Triết học Mác - Lênin", 3, 3, 0, 0),
                new Course("4203014165", "Kinh tế chính trị Mác - Lênin", 2, 2, 0, 0),
                new Course("4203015253", "Tiếng Anh 1", 3, 3, 0, 0),
                new Course("4203000901", "Cấu trúc rời rạc", 3, 3, 0, 0),
                new Course("4203000942", "Cấu trúc dữ liệu và giải thuật", 4, 3, 1, 0),
                new Course("4203001146", "Hệ cơ sở dữ liệu", 4, 3, 1, 0),
                new Course("4203003206", "Môi trường và con người", 3, 3, 0, 0),
                new Course("4203003288", "Toán cao cấp 2", 2, 2, 0, 0),
                new Course("4203003591", "Lập trình hướng đối tượng", 3, 2, 1, 0),
                new Course("4203015254", "Tiếng Anh 2", 3, 3, 0, 0),
                new Course("4203000908", "Lý thuyết đồ thị", 3, 3, 0, 0),
                new Course("4203003198", "Phương pháp luận nghiên cứu khoa học", 2, 2, 0, 0),
                new Course("4203003245", "Tiếng Việt thực hành", 3, 3, 0, 0),
                new Course("4203003501", "Phát triển ứng dụng", 3, 2, 1, 0),
                new Course("4203014167", "Chủ nghĩa xã hội khoa học", 2, 2, 0, 0),
                new Course("4203014168", "Mô hình hóa dữ liệu NoSQL MongoDB", 3, 3, 0, 0),
                new Course("4203001432", "Lập trình thiết bị di động", 4, 3, 1, 0),
                new Course("4203002422", "Pháp luật đại cương", 2, 2, 0, 0),
                new Course("4203003592", "Đảm bảo chất lượng và Kiểm thử phần mềm", 3, 2, 1, 0),
                new Course("4203003621", "Lập trình WWW (Java)", 4, 3, 1, 0),
                new Course("4203014169", "Lịch sử Đảng Cộng sản Việt Nam", 2, 2, 0, 0),
                new Course("4203000941", "Kỹ thuật lập trình", 3, 1, 2, 1),
                new Course("4203002137", "Hệ Thống Máy tính", 4, 1, 3, 1),
                new Course("4203003306", "Giáo dục thể chất 2 ", 2, 0, 2, 1),
                new Course("4203003354", "Giáo dục quốc phòng và an ninh 2", 4, 2, 2, 1),
                new Course("4203001058", "Mạng máy tính", 3, 3, 0, 1),
                new Course("4203001207", "Hệ quản trị cơ sở dữ liệu", 3, 2, 1, 1),
                new Course("4203002070", "Lập trình hướng sự kiện với công nghệ Java", 4, 3, 1, 1),
                new Course("4203002145", "Hệ Thống và Công nghệ Web", 3, 2, 1, 1),
                new Course("4203003753", "Phân tích thiết kế hệ thống", 3, 2, 1, 1),
                new Course("4203014166", "Hệ quản trị cơ sở dữ liệu NoSQL MongoDB", 3, 2, 1, 1),
                new Course("4203001004", "Nhập môn an toàn thông tin", 3, 3, 0, 1),
                new Course("4203001111", "Công nghệ phần mềm", 3, 3, 0, 1),
                new Course("4203002031", "Lập trình phân tích dữ liệu 1", 3, 2, 1, 1),
                new Course("4203002146", "Lập trình phân tán với công nghệ Java", 3, 2, 1, 1),
                new Course("4203003347", "Những vấn đề xã hội và đạo đức nghề nghiệp", 3, 3, 0, 1),
                new Course("4203003451", "Thống kê máy tính và ứng dụng", 3, 2, 1, 1),
                new Course("4203003320","Phương pháp tính", 3, 3,0, 1)
        );
        List<String> class_ids = List.of(
                "420300090122102",
                "420300090823102",
                "420300094121201",
                "420300094222101",
                "420300100423202",
                "420300105822201",
                "420300111123201",
                "420300114622103",
                "420300120722202",
                "420300143224101",
                "420300200921101",
                "420300207022201",
                "420300213721203",
                "420300214522201",
                "420300214623201",
                "420300242224103",
                "420300319221101",
                "420300319823101",
                "420300324221101",
                "420300324523101",
                "420300325921101",
                "420300328822103",
                "420300330621201",
                "420300330721102",
                "420300332021201",
                "420300334723203",
                "420300335421201",
                "420300345123201",
                "420300350123102",
                "420300359122101",
                "420300359224101",
                "420300362124101",
                "420300375322201",
                "420300384821103",
                "420301416421101",
                "420301416622201",
                "420301416823101",
                "420301525321101",
                "420301525422101"
        );

        List<Map<String, Object>> boundList = bindClassIdToCourse(class_ids, courses);

        List<GradeReport> randomReports = generateRandomGradeReports(boundList, "21023911");

        for (GradeReport report : randomReports) {
            System.out.println(report + ",");
        }
        return;
    }


    private static List<Map<String, Object>> bindClassIdToCourse(List<String> classIds, List<Course> courses) {
        List<Map<String, Object>> boundList = new ArrayList<>();

        for (int i = 0; i < classIds.size(); i++) {
            String classId = classIds.get(i);
            Course course = courses.get(i);

            String courseIdPart = classId.substring(0, 10);
            int year = Integer.parseInt("20" + classId.substring(10, 12));
            int semester = Integer.parseInt(classId.substring(12, 13));

            Course matchingCourse = courses.stream()
                    .filter(course1 -> courseIdPart.equals(course1.id()))
                    .findFirst()
                    .orElse(null);

            if (matchingCourse != null) {
                Map<String, Object> boundItem = new HashMap<>();
                boundItem.put("course", matchingCourse);
                boundItem.put("year", year);
                boundItem.put("semester", semester);
                boundItem.put("classId", classId);

                boundList.add(boundItem);
            } else {
                System.out.println("No matching course found for class ID: " + classId);
            }
        }

        return boundList;
    }

    private static List<GradeReport> generateRandomGradeReports(List<Map<String, Object>> boundList, String studentIds) {
        List<GradeReport> reports = new ArrayList<>();

        for (Map<String, Object> boundItem : boundList) {
            Course course = (Course) boundItem.get("course");
            String classId = (String) boundItem.get("classId");
            String studentId = studentIds;

            GradeReport report = new GradeReport();
            report.setClassId(classId);
            report.setStudentId(studentId);
//            report.setSemester((Integer) boundItem.get("semester"));
//            report.setYear((Integer) boundItem.get("year"));
            report.setCourseId(course.id());
            report.setCourseName(course.name());
            report.setCredit(course.credit());
            report.setTheoryCredit(course.theoryCredit());
            report.setPracticalCredit(course.practicalCredit());
            report.setMidtermScore(generateRandomScore());
            report.setFinalScore(generateRandomScore());
            report.setPracticalScores(generateRandomScoreList(report.getPracticalCredit()));
            report.setTheoryScores(generateRandomScoreList(report.getTheoryCredit()));
            report.setOverallScore(calculateOverallScore(report));
            report.setStatus(report.getOverallScore() >= 5 ? CourseReportStatus.PASSED : CourseReportStatus.FAILED);

            reports.add(report);
        }

        return reports;
    }

    private static float generateRandomScore() {
        // Generate a random integer between 4 and 10
        int randomInt = (int) (Math.random() * 7) + 4;

        // Array of possible decimal values
        float[] possibleDecimals = {0.0f, 0.25f, 0.5f, 0.75f};

        // Generate a random index for the array
        int randomIndex = (int) (Math.random() * possibleDecimals.length);

        // Add the random integer and the decimal value at the random index
        if (randomInt + possibleDecimals[randomIndex] > 10)
            return 10;
        return randomInt + possibleDecimals[randomIndex];
    }

    private static List<Float> generateRandomScoreList(int count) {
        List<Float> scores = new ArrayList<>();
        if (count == 0) return scores;
        for (int i = 0; i < 3; i++) {
            scores.add(generateRandomScore());
        }
        return scores;
    }

    private static float calculateOverallScore(GradeReport report) {
        float midtermScore = report.getMidtermScore();
        float finalScore = report.getFinalScore();
        float avgPracticalScores = report.getPracticalScores().isEmpty() ? 0 : report.getPracticalScores().stream().reduce(0f, Float::sum) / report.getPracticalScores().size();
        float avgTheoryScores = report.getTheoryScores().isEmpty() ? 0 : report.getTheoryScores().stream().reduce(0f, Float::sum) / report.getTheoryScores().size();

        float overallScore = 0.5f * finalScore + 0.3f * midtermScore;
        if (report.getPracticalCredit() > 0 && report.getTheoryCredit() > 0) {
            overallScore += 0.2f * (avgPracticalScores + avgTheoryScores) / 2;
        } else if (report.getPracticalCredit() > 0) {
            overallScore += 0.2f * avgPracticalScores;
        } else if (report.getTheoryCredit() > 0) {
            overallScore += 0.2f * avgTheoryScores;
        }

        return overallScore;
    }

    @Test
    public void testCreateSemesterSummaries() {
        createSemesterSummaries("21082081");
        createSemesterSummaries("21023911");
    }

    public void createSemesterSummaries(String studentId) {
        // Get all GradeReport objects for the student
        List<GradeReport> gradeReports = gradeReportRepository.findByStudentId(studentId);

        // Group the GradeReport objects by semester and year
        Map<Pair<Integer, Integer>, List<GradeReport>> groupedReports = gradeReports.stream()
                .collect(Collectors.groupingBy(report -> {
                    String classId = report.getClassId();
                    int year = Integer.parseInt("20" + classId.substring(10, 12));
                    int semester = Integer.parseInt(classId.substring(12, 13));
                    return Pair.of(semester, year);
                }));

        // For each group, create a SemesterSummary object
        for (Map.Entry<Pair<Integer, Integer>, List<GradeReport>> entry : groupedReports.entrySet()) {
            Pair<Integer, Integer> semesterYear = entry.getKey();
            List<GradeReport> reports = entry.getValue();

            SemesterSummary summary = new SemesterSummary();
            summary.setStudentId(studentId);
            summary.setSemester(semesterYear.getFirst());
            summary.setYear(semesterYear.getSecond());
            summary.setGradeReports(reports);
            summary.setMajorId(1);
            // Calculate the GPA, total credits, and total passed credits
            // This assumes you have methods in the GradeReport class to get the credits and whether the course was passed
            summary.setGpa((float) reports.stream()
                    .mapToDouble(report ->
                            (report.getTheoryScores().stream().mapToDouble(Float::doubleValue).average().orElse(0) * report.getTheoryCredit()
                                    + report.getPracticalScores().stream().mapToDouble(Float::doubleValue).average().orElse(0) * report.getPracticalCredit())
                                    / (report.getTheoryCredit() + report.getPracticalCredit()))
                    .average()
                    .orElse(0));
            summary.setTotalCredits(reports.stream().mapToInt(GradeReport::getCredit).sum());
            summary.setTotalPassedCredits(reports.stream().filter(gradeReport -> gradeReport.getStatus().equals(CourseReportStatus.PASSED)).mapToInt(GradeReport::getCredit).sum());

            System.out.println(groupedReports);
            // Save the SemesterSummary object
            semesterSummaryRepository.save(summary);
        }
    }
}