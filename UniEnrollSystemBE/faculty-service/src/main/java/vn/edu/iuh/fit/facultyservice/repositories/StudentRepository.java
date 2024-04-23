package vn.edu.iuh.fit.facultyservice.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.edu.iuh.fit.facultyservice.models.Student;

public interface StudentRepository extends JpaRepository<Student, String> {
}
