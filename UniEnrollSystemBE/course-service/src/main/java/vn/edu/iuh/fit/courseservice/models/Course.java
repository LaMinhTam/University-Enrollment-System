package vn.edu.iuh.fit.courseservice.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

@Document(collection = "course")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Course {
    @Id
    private String id;
    private String name;
    private int credit;
    @Field("theory_credit")
    private int theoryCredit;
    @Field("practical_credit")
    private int practicalCredit;
    @Field("course_on_major")
    private List<CourseOnMajor> courseOnMajorList;
    private List<String> prerequisites;
}
