package vn.edu.iuh.fit.courseservice.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import vn.edu.iuh.fit.courseservice.models.Course;

import java.util.List;

@Repository
public interface CourseRepository extends MongoRepository<Course, String> {


    List<Course> findByCourseOnMajorListMajorIdAndCourseOnMajorListAcademicYear(int majorId, int academicYear);

    Course getCourseById(String id);

    List<Course> findAllByIdIn(List<String> courseIds);
}
