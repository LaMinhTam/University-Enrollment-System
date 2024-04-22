package vn.edu.iuh.fit.studentservice.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Student {
    @Id
    private String id;
    @Column(length = 45, nullable = false)
    private String fullName;
    @Column(length = 64)
    private String photos;

}
