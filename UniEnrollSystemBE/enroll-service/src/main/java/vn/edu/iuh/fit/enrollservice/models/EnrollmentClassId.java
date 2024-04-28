package vn.edu.iuh.fit.enrollservice.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EnrollmentClassId implements Serializable {
    private String studentId;
    private String registryClass;
    private String courseId;
}
