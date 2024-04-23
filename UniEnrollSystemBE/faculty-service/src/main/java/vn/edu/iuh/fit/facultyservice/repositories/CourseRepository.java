package vn.edu.iuh.fit.facultyservice.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import vn.edu.iuh.fit.facultyservice.models.Course;
import vn.edu.iuh.fit.facultyservice.models.Faculty;
import vn.edu.iuh.fit.facultyservice.models.MajorCourseYear;

import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    @Query("SELECT c FROM MajorCourseYear c WHERE c.major.id = ?1 AND c.academicYear = ?2")
    List<MajorCourseYear> findAllByMajorAndYear(int majorId, int year);
}
