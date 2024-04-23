package vn.edu.iuh.fit.facultyservice.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.edu.iuh.fit.facultyservice.models.Course;
import vn.edu.iuh.fit.facultyservice.models.Faculty;

import java.util.List;

public interface FacultyRepository extends JpaRepository<Faculty, Long> {

}
