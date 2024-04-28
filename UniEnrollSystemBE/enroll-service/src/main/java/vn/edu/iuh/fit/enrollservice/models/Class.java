package vn.edu.iuh.fit.enrollservice.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "classes")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Class {
    @Id
    private String id;
    private String courseId;
    private String courseName;
    private int semester;
    private int year;
    private int maxCapacity;
    @Enumerated(EnumType.STRING)
    private ClassStatus status;
}
