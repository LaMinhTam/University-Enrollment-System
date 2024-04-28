package vn.edu.iuh.fit.courseservice.services.impl;

import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.courseservice.models.Course;
import vn.edu.iuh.fit.courseservice.repositories.CourseRepository;
import vn.edu.iuh.fit.courseservice.services.CourseService;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class CourseServiceImpl implements CourseService {
    private final MongoTemplate mongoTemplate;
    private final CourseRepository courseRepository;

    public CourseServiceImpl(CourseRepository courseRepository, MongoTemplate mongoTemplate) {
        this.courseRepository = courseRepository;
        this.mongoTemplate = mongoTemplate;
    }

    @Override
    public Map<Integer, List<Course>> listAllCourseByMajorAndYear(int majorId, int year) {
        Query query = Query.query(
                Criteria.where("course_on_major").elemMatch(
                        Criteria.where("major_id").is(majorId).and("academic_year").is(year)
                )
        );
        List<Course> courses = mongoTemplate.find(query, Course.class);
        courses.forEach(course -> course.setCourseOnMajorList(course.getCourseOnMajorList().stream()
                .filter(courseOnMajor -> courseOnMajor.getMajorId() == majorId && courseOnMajor.getAcademicYear() == year)
                .collect(Collectors.toList())));
        Map<Integer, List<Course>> coursesBySemester = courses.stream()
                .collect(Collectors.groupingBy(course -> course.getCourseOnMajorList().get(0).getSemester()));
        return coursesBySemester;
    }

    @Override
    public List<Course> getCoursesByIds(List<String> courseIds) {
        return courseRepository.findAllByIdIn(courseIds);
    }
}
