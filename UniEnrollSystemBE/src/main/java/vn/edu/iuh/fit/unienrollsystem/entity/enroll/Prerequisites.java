package vn.edu.iuh.fit.unienrollsystem.entity.enroll;

import jakarta.persistence.*;

@Entity
public class Prerequisites {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;

    @ManyToOne
    @JoinColumn(name = "prerequisite_course_id")
    private Course prerequisiteCourse;

    public Prerequisites() {
    }

    public Prerequisites(Long id, Course course, Course prerequisiteCourse) {
        this.id = id;
        this.course = course;
        this.prerequisiteCourse = prerequisiteCourse;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public Course getPrerequisiteCourse() {
        return prerequisiteCourse;
    }

    public void setPrerequisiteCourse(Course prerequisiteCourse) {
        this.prerequisiteCourse = prerequisiteCourse;
    }
}