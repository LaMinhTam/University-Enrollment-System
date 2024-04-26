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
    private Date createdAt;
}
