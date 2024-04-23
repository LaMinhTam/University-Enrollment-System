package vn.edu.iuh.fit.facultyservice.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "major_course_year")
@IdClass(MajorCourseYearId.class)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class MajorCourseYear {
    @Id
    @ManyToOne
    @JoinColumn(name = "major_id")
    private Major major;

    @Id
    @Column(name = "academic_year")
    private int academicYear;

    @Id
    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;

    private int semester;
    @Enumerated(EnumType.ORDINAL)
    private CourseType type;
}
