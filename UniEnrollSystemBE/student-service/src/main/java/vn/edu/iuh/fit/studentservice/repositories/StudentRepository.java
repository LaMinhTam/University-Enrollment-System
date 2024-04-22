package vn.edu.iuh.fit.studentservice.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.edu.iuh.fit.studentservice.models.Student;

public interface StudentRepository extends JpaRepository<Student, String>{

}
