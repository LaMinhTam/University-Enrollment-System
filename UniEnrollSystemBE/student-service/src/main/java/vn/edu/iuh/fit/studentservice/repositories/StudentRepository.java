package vn.edu.iuh.fit.studentservice.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.edu.iuh.fit.studentservice.models.Student;

import java.util.Optional;

public interface StudentRepository extends JpaRepository<Student, String>{

    Optional<Student> findById(String username);
}
