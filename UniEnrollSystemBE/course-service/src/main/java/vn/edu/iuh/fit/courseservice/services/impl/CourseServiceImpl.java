package vn.edu.iuh.fit.courseservice.services.impl;

import org.bson.Document;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.*;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.courseservice.dtos.CourseDTO;
import vn.edu.iuh.fit.courseservice.dtos.ListCourseResponse;
import vn.edu.iuh.fit.courseservice.models.Course;
import vn.edu.iuh.fit.courseservice.services.CourseService;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static org.springframework.data.mongodb.core.aggregation.ArrayOperators.Filter.filter;
import static org.springframework.data.mongodb.core.aggregation.VariableOperators.mapItemsOf;

@Service
public class CourseServiceImpl implements CourseService {
    private static final String COURSE_ON_MAJOR = "course_on_major";
    private static final String MAJOR_ID = "major_id";
    private static final String ELECTIVE_GROUP = "elective_group";
    private static final String ACADEMIC_YEAR = "academic_year";
    private static final String PREREQUISITES = "prerequisites";
    private static final String COURSE = "course";
    private static final String ID = "_id";
    private static final String COURSE_ID = "course_id";
    private static final String CREDIT = "credit";
    private static final String NAME = "name";
    private static final String THEORY_CREDIT = "theory_credit";
    private static final String PRACTICAL_CREDIT = "practical_credit";
    private static final String SEMESTER = "semester";
    private static final String TYPE = "type";

    private final MongoTemplate mongoTemplate;

    public CourseServiceImpl(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    @Override
    public Map<Integer, List<CourseDTO>> listAllCourseByMajorAndYear(int majorId, int year) {
        Aggregation aggregation = Aggregation.newAggregation(
                matchStage(majorId, year),
                lookupStage(),
                projectStage(majorId)
        );

        List<CourseDTO> courses = mongoTemplate.aggregate(aggregation, Course.class, CourseDTO.class).getMappedResults();
        return courses.stream().collect(Collectors.groupingBy(CourseDTO::getSemester));
    }

    @Override
    public List<ListCourseResponse> getCoursesByIds(int majorId, List<String> courseIds) {
        Aggregation aggregation = Aggregation.newAggregation(
                Aggregation.match(Criteria.where(ID).in(courseIds)),
                lookupStage(),
                projectStage(majorId)
        );

        return mongoTemplate.aggregate(aggregation, Course.class, ListCourseResponse.class).getMappedResults();
    }

    private MatchOperation matchStage(int majorId, int year) {
        return Aggregation.match(Criteria.where(COURSE_ON_MAJOR).elemMatch(
                Criteria.where(MAJOR_ID).is(majorId).and(ACADEMIC_YEAR).is(year)
        ));
    }

    private LookupOperation lookupStage() {
        return Aggregation.lookup(COURSE, PREREQUISITES, ID, PREREQUISITES);
    }

    private ProjectionOperation projectStage(int majorId) {
        return Aggregation.project()
                .andInclude(ID, CREDIT, NAME, THEORY_CREDIT, PRACTICAL_CREDIT, PREREQUISITES)
                .and(ArrayOperators.arrayOf(COURSE_ON_MAJOR + "." + SEMESTER).elementAt(0)).as(SEMESTER)
                .and(ArrayOperators.arrayOf(COURSE_ON_MAJOR + "." + TYPE).elementAt(0)).as(TYPE)
                .and(ArrayOperators.arrayOf(COURSE_ON_MAJOR + "." + ELECTIVE_GROUP).elementAt(0)).as(ELECTIVE_GROUP)
                .and(filter(COURSE_ON_MAJOR)
                        .as("item")
                        .by(ComparisonOperators.valueOf("$$item." + MAJOR_ID).notEqualTo(String.valueOf(majorId)))
                ).as(COURSE_ON_MAJOR)
                .and(mapItemsOf(PREREQUISITES)
                        .as("prerequisite")
                        .andApply(context -> new Document(COURSE_ID, "$$prerequisite." + ID)
                                .append(NAME, "$$prerequisite." + NAME)
                                .append(CREDIT, "$$prerequisite." + CREDIT)
                                .append(PRACTICAL_CREDIT, "$$prerequisite." + PRACTICAL_CREDIT)
                                .append(THEORY_CREDIT, "$$prerequisite." + THEORY_CREDIT))).as(PREREQUISITES);
    }
}
