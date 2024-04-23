package vn.edu.iuh.fit.facultyservice.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "students")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Student {
    @Id
    private String id;
    @ManyToOne
    @JoinColumn(name = "major_id")
    private Major major;
    private String name;
    int year;
}
