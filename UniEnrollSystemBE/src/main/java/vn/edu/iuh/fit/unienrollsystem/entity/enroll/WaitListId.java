package vn.edu.iuh.fit.unienrollsystem.entity.enroll;

import vn.edu.iuh.fit.unienrollsystem.entity.student.Student;

import java.io.Serializable;

public class WaitListId implements Serializable {

    private Student student;
    private Course course;
    private String semester;

    public WaitListId() {
    }

    public WaitListId(Student student, Course course, String semester) {
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