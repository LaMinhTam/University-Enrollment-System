package vn.edu.iuh.fit.grademanagementservice.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.util.ArrayList;
import java.util.List;

@Document
@Data
@AllArgsConstructor
@NoArgsConstructor
public class GradeReport {
    @Field("class_id")
    private String classId;
    @Field("student_id")
    private String studentId;
    @Field("course_id")
    private String courseId;
    @Field("course_name")
    private String courseName;
    private int credit;
    @Field("practical_credit")
    private int practicalCredit;
    @Field("theory_credit")
    private int theoryCredit;
    @Field("midterm_score")
    private float midtermScore;
    @Field("final_score")
    private float finalScore;
    @Field("practical_scores")
    private List<Float> practicalScores = new ArrayList<>();
    @Field("theory_scores")
    private List<Float> theoryScores = new ArrayList<>();
    @Field("overall_score")
    private float overallScore;
    private CourseReportStatus status;

    @Override
    public String toString() {
        String theoryScoresString = theoryScores.isEmpty() ? "" : ", \"theory_scores\":" + theoryScores;
        String practicalScoresString = practicalScores.isEmpty() ? "" : ", \"practical_scores\":" + practicalScores;
        return "{" +
                "\"class_id\":\"" + this.classId + '\"' +
                ", \"student_id\":\"" + this.studentId + '\"' +
                ", \"course_id\":\"" + this.courseId + '\"' +
                ", \"course_name\":\"" + this.courseName + '\"' +
                ", \"credit\":" + credit +
                ", \"theory_credit\":" + this.theoryCredit +
                ", \"practical_credit\":" + this.practicalCredit +
                ", \"midterm_score\":" + this.midtermScore +
                ", \"final_score\":" + this.finalScore +
                practicalScoresString +
                theoryScoresString +
                ", \"overall_score\":" + this.overallScore +
                ", \"status\":\"" + status + '\"' +
                '}';
    }
}
