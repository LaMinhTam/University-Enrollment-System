package vn.edu.iuh.fit.unienrollsystem.entity.enroll;

import jakarta.persistence.*;
import vn.edu.iuh.fit.unienrollsystem.entity.student.Student;

@Entity
@Table(name = "enrollment")
public class Enrollment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;

    @ManyToOne
    @JoinColumn(name = "class_id")
    private Class enrolledClass;

    @Column(name = "status")
    private EnrollStatus status;

    public Enrollment() {
    }

    public Enrollment(Long id, Student student, Class enrolledClass, EnrollStatus status) {
        this.id = id;
        this.student = student;
        this.enrolledClass = enrolledClass;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public Class getEnrolledClass() {
        return enrolledClass;
    }

    public void setEnrolledClass(Class enrolledClass) {
        this.enrolledClass = enrolledClass;
    }

    public EnrollStatus getStatus() {
        return status;
    }

    public void setStatus(EnrollStatus status) {
        this.status = status;
    }
}