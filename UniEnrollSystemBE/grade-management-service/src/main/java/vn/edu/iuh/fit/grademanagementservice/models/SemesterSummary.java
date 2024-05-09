package vn.edu.iuh.fit.grademanagementservice.models;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.ArrayList;
import java.util.List;

@Document
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SemesterSummary {
    @Field("student_id")
    private String studentId;
    private int semester;
    @Field("year")
    private int year;
    @Field("major_id")
    private int majorId;
    @Field("grades")
    private List<GradeReport> gradeReports = new ArrayList<>();
    private float gpa;
    @Field("total_credits")
    private int totalCredits;
    @Field("total_passed_credits")
    private int totalPassedCredits;
}