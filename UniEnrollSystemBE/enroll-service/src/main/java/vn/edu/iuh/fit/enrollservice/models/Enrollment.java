package vn.edu.iuh.fit.enrollservice.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Table(name = "enrollments")
@Data
@AllArgsConstructor
@NoArgsConstructor
@IdClass(EnrollmentClassId.class)
public class Enrollment {
    @Id
    private String studentId;
    @Id
    private String registryClass;
    @Id
    private String courseId;
    private int semester;
    private int year;
    private Date createdAt;
    private Date updatedAt;
    @Column(name = "group_id")
    private int group;
    @Enumerated(EnumType.STRING)
    private PaymentStatus status;
}
