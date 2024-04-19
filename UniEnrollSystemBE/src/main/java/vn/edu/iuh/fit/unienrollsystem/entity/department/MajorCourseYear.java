package vn.edu.iuh.fit.unienrollsystem.entity.department;

import jakarta.persistence.*;
import vn.edu.iuh.fit.unienrollsystem.entity.enroll.Course;

@Entity
@Table(name = "major_course_year")
@IdClass(MajorCourseYearId.class)
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

    public MajorCourseYear() {
    }

    public MajorCourseYear(Major major, int academicYear, Course course) {
        this.major = major;
        this.academicYear = academicYear;
        this.course = course;
    }

    public Major getMajor() {
        return major;
    }

    public void setMajor(Major major) {
        this.major = major;
    }

    public int getAcademicYear() {
        return academicYear;
    }

    public void setAcademicYear(int academicYear) {
        this.academicYear = academicYear;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }
}
