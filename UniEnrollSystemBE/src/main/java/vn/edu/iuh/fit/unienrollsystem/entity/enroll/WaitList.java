package vn.edu.iuh.fit.unienrollsystem.entity.enroll;

import jakarta.persistence.*;
import vn.edu.iuh.fit.unienrollsystem.entity.student.Student;

@Entity
@IdClass(WaitListId.class)
public class WaitList {
    @Id
    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;
    @Id
    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;
    @Id
    private String semester;

    public WaitList() {
    }

    public WaitList(Student student, Course course, String semester) {
        this.student = student;
        this.course = course;
        this.semester = semester;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public String getSemester() {
        return semester;
    }

    public void setSemester(String semester) {
        this.semester = semester;
    }
}