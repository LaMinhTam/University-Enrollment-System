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
    private int semester;
    @Field("year")
    private int year;
    @Field("grades")
    private List<GradeReport> gradeReports = new ArrayList<>();
    private float gpa;
    private int totalCredits;
    private int totalPassedCredits;
}