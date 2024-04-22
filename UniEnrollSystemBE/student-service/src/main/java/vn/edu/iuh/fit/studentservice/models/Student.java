package vn.edu.iuh.fit.studentservice.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import vn.edu.iuh.fit.studentservice.DTO.StudentDTO;

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
    @Column(length = 64, nullable = false)
    private String password;
    @Column(length = 64)
    private String photos;
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "students_roles",
            joinColumns = @JoinColumn(name = "student_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<Role> roles = new HashSet<>();

    public Student(StudentDTO studentDTO) {
        this.id = studentDTO.id();
        this.fullName = studentDTO.fullName();
        this.password = studentDTO.password();
        this.photos = studentDTO.photos();
        this.roles = Set.of(new Role(studentDTO.role()));
    }
}
