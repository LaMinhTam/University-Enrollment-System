package vn.edu.iuh.fit.courseservice.services.impl;

import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.courseservice.models.Course;
import vn.edu.iuh.fit.courseservice.repositories.CourseRepository;
import vn.edu.iuh.fit.courseservice.services.CourseService;

import java.util.List;

@Service
public class CourseServiceImpl implements CourseService {
    private final MongoTemplate mongoTemplate;
    private final CourseRepository courseRepository;

    public CourseServiceImpl(CourseRepository courseRepository, MongoTemplate mongoTemplate) {
        this.courseRepository = courseRepository;
        this.mongoTemplate = mongoTemplate;
    }

    @Override
    public List<Course> listAllCourseByMajorAndYear(int majorId, int year) {
        Query query = Query.query(
                Criteria.where("course_on_major").elemMatch(
                        Criteria.where("major_id").is(majorId).and("academic_year").is(year)
                )
        );
        return mongoTemplate.find(query, Course.class);
//        return courseRepository.findByCourseOnMajorListMajorIdAndCourseOnMajorListAcademicYear(majorId, year);
    }

    @Override
    public List<Course> getCoursesByIds(List<String> courseIds) {
        return courseRepository.findAllByIdIn(courseIds);
    }
}
