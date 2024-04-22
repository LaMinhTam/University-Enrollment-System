package vn.edu.iuh.fit.authservice.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.edu.iuh.fit.authservice.models.Student;

import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, String>{
}
