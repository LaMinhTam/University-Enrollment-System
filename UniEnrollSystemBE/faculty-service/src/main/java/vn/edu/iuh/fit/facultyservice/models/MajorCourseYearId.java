package vn.edu.iuh.fit.facultyservice.models;

import java.io.Serializable;

public class MajorCourseYearId implements Serializable {

    private int academicYear;
    private Major major;
    private Course course;
    public MajorCourseYearId() {
    }

    public MajorCourseYearId(int academicYear, Major major, Course course) {
        this.academicYear = academicYear;
        this.major = major;
        this.course = course;
    }

    public int getAcademicYear() {
        return academicYear;
    }

    public void setAcademicYear(int academicYear) {
        this.academicYear = academicYear;
    }

    public Major getMajor() {
        return major;
    }

    public void setMajor(Major major) {
        this.major = major;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }
}