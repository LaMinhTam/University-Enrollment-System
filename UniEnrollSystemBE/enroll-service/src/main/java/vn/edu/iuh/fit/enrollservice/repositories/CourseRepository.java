package vn.edu.iuh.fit.enrollservice.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import vn.edu.iuh.fit.enrollservice.models.Course;

import java.util.List;

@Repository
public interface CourseRepository extends MongoRepository<Course, String> {


    List<Course> findByCourseOnMajorListMajorIdAndCourseOnMajorListAcademicYear(int majorId, int academicYear);

    Course getCourseById(String id);
}
