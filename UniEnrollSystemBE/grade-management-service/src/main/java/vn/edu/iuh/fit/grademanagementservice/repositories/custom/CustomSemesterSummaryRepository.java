package vn.edu.iuh.fit.grademanagementservice.repositories.custom;

import org.bson.Document;
import vn.edu.iuh.fit.grademanagementservice.models.SemesterSummary;

import java.util.List;

public interface CustomSemesterSummaryRepository {
    SemesterSummary findByStudentIdAndSemesterAndYear(String studentId, int semester, int year);

    List<SemesterSummary> findByStudentId(String studentId);

    List<Document> findClassesAverageOverall(List<String> classIds);

    int calculateScholarship(int majorId, int semester, int year, float gpa);
}
