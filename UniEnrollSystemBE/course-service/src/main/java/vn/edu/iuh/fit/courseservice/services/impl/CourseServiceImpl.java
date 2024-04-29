package vn.edu.iuh.fit.courseservice.services.impl;

import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.ArrayOperators;
import org.springframework.data.mongodb.core.aggregation.ComparisonOperators;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.courseservice.models.Course;
import vn.edu.iuh.fit.courseservice.repositories.CourseRepository;
import vn.edu.iuh.fit.courseservice.services.CourseService;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static org.springframework.data.mongodb.core.aggregation.ArrayOperators.Filter.filter;

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
        Aggregation aggregation = Aggregation.newAggregation(
                Aggregation.match(Criteria.where("course_on_major").elemMatch(
                        Criteria.where("major_id").is(majorId).and("academic_year").is(year)
                )),
                Aggregation.lookup(
                        "course",
                        "prerequisites",
                        "_id",
                        "prerequisites"
                ),
                Aggregation.project().andInclude("_id", "credit", "name", "theory_credit", "practical_credit", "prerequisites", "course_on_major")
                        .and(
                                ArrayOperators.Filter.filter("course_on_major")
                                        .as("item")
                                        .by(ComparisonOperators.valueOf("$$item.major_id").notEqualTo(String.valueOf(majorId)))
                        )
        );

        List<Course> courses = mongoTemplate.aggregate(aggregation, Course.class, Course.class).getMappedResults();
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
