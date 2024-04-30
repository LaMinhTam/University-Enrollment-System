package vn.edu.iuh.fit.courseservice.services.impl;

import org.bson.Document;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.*;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.courseservice.dtos.CourseDTO;
import vn.edu.iuh.fit.courseservice.dtos.ListCourseResponse;
import vn.edu.iuh.fit.courseservice.models.Course;
import vn.edu.iuh.fit.courseservice.repositories.CourseRepository;
import vn.edu.iuh.fit.courseservice.services.CourseService;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static org.springframework.data.mongodb.core.aggregation.ArrayOperators.Filter.filter;
import static org.springframework.data.mongodb.core.aggregation.VariableOperators.mapItemsOf;

@Service
public class CourseServiceImpl implements CourseService {
    private final MongoTemplate mongoTemplate;
    private final CourseRepository courseRepository;

    public CourseServiceImpl(CourseRepository courseRepository, MongoTemplate mongoTemplate) {
        this.courseRepository = courseRepository;
        this.mongoTemplate = mongoTemplate;
    }

    @Override
    public Map<Integer, List<CourseDTO>> listAllCourseByMajorAndYear(int majorId, int year) {
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
                Aggregation.project().andInclude("_id", "credit", "name", "theory_credit", "practical_credit", "prerequisites")
                        .and(ArrayOperators.arrayOf("course_on_major.semester").elementAt(0)).as("semester")
                        .and(ArrayOperators.arrayOf("course_on_major.type").elementAt(0)).as("type")
                        .and(
                                ArrayOperators.Filter.filter("course_on_major")
                                        .as("item")
                                        .by(ComparisonOperators.valueOf("$$item.major_id").notEqualTo(String.valueOf(majorId)))
                        ).as("course_on_major")
                        .and(mapItemsOf("prerequisites")
                                .as("prerequisite")
                                .andApply(context -> new Document("course_id", "$$prerequisite._id")
                                        .append("name", "$$prerequisite.name")
                                        .append("credit", "$$prerequisite.credit")
                                        .append("practical_credit", "$$prerequisite.practical_credit")
                                        .append("theory_credit", "$$prerequisite.theory_credit"))).as("prerequisites")
        );

        List<CourseDTO> courses = mongoTemplate.aggregate(aggregation, Course.class, CourseDTO.class).getMappedResults();
        Map<Integer, List<CourseDTO>> coursesBySemester =
                courses.stream()
                        .collect(Collectors.groupingBy(course -> course.getSemester()));
        return coursesBySemester;
    }

    @Override
    public List<ListCourseResponse> getCoursesByIds(int majorId, List<String> courseIds) {
        MatchOperation matchStage = Aggregation.match(Criteria.where("_id").in(courseIds));

        LookupOperation lookupStage = Aggregation.lookup("course", "prerequisites", "_id", "prerequisites");

        ProjectionOperation projectStage = Aggregation.project()
                .andInclude("_id", "credit", "name", "theory_credit", "practical_credit", "prerequisites")
                .and("course_on_major.semester").arrayElementAt(0).as("semester")
                .and("course_on_major.type").arrayElementAt(0).as("type")
                .and(
                        filter("course_on_major")
                                .as("item")
                                .by(ComparisonOperators.valueOf("$$item.major_id").notEqualTo(String.valueOf(majorId)))
                ).as("course_on_major")
                .and(mapItemsOf("prerequisites")
                        .as("prerequisite")
                        .andApply(context -> new Document("course_id", "$$prerequisite._id")
                                .append("name", "$$prerequisite.name")
                                .append("credit", "$$prerequisite.credit")
                                .append("practical_credit", "$$prerequisite.practical_credit")
                                .append("theory_credit", "$$prerequisite.theory_credit"))).as("prerequisites");

        Aggregation aggregation = Aggregation.newAggregation(matchStage, lookupStage, projectStage);

        return mongoTemplate.aggregate(aggregation, Course.class, ListCourseResponse.class).getMappedResults();
    }
}
