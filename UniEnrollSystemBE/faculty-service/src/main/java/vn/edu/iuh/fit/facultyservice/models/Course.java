package vn.edu.iuh.fit.facultyservice.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "courses")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Course {
    @Id
    private String id;
    private String name;
    private int credit;
    private int theoryCredit;
    private int practicalCredit;
    @ManyToMany
    @JoinTable(
            name = "prerequisites",
            joinColumns = @JoinColumn(name = "course_id"),
            inverseJoinColumns = @JoinColumn(name = "prerequisite_course_id")
    )
    private Set<Course> prerequisiteCourses = new HashSet<>();
}
