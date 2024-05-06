package vn.edu.iuh.fit.grademanagementservice.repositories.custom;

import org.bson.Document;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.aggregation.MatchOperation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import vn.edu.iuh.fit.grademanagementservice.models.SemesterSummary;

import java.util.List;

public class CustomSemesterSummaryRepositoryImpl implements CustomSemesterSummaryRepository {
    private final MongoTemplate mongoTemplate;

    public CustomSemesterSummaryRepositoryImpl(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }


    @Override
    public SemesterSummary findByStudentIdAndSemesterAndYear(String studentId, int semester, int year) {
        Query query = new Query();
        query.addCriteria(Criteria.where("student_id").is(studentId)
                .and("semester").is(semester)
                .and("year").is(year));
        return mongoTemplate.findOne(query, SemesterSummary.class);
    }

    @Override
    public List<SemesterSummary> findByStudentId(String studentId) {
        Query query = new Query();
        query.addCriteria(Criteria.where("student_id").is(studentId));
        query.with(Sort.by(Sort.Order.asc("year"), Sort.Order.asc("semester")));
        return mongoTemplate.find(query, SemesterSummary.class);
    }

    @Override
    public List<Document> findClassesAverageOverall(List<String> classIds) {
        MatchOperation matchStage = Aggregation.match(Criteria.where("class_id").in(classIds));
        Aggregation aggregation = Aggregation.newAggregation(
                matchStage,
                Aggregation.
                        group("class_id").
                        first("course_name").as("name").
                        avg("overall_score").as("average")
        );

        AggregationResults<Document> result = mongoTemplate.aggregate(aggregation, "gradeReport", Document.class);
        return result.getMappedResults();
    }

    @Override
    public int calculateScholarship(int majorId, int semester, int year, float gpa) {
        Query query = new Query();
        query.addCriteria(Criteria.where("major_id").is(majorId)
                .and("semester").is(semester)
                .and("year").is(year));
        query.with(Sort.by(Sort.Order.desc("gpa")));
        List<SemesterSummary> summaries = mongoTemplate.find(query, SemesterSummary.class);

        int totalStudents = summaries.size();
        float scholarshipAGpa = summaries.get(totalStudents * 5 / 100).getGpa();
        float scholarshipBGpa = summaries.get(totalStudents * 10 / 100).getGpa();
        float scholarshipCGpa = summaries.get(totalStudents * 15 / 100).getGpa();
        float scholarshipDGpa = summaries.get(totalStudents * 20 / 100).getGpa();

        if (gpa >= scholarshipAGpa) {
            return 100;
        } else if (gpa >= scholarshipBGpa) {
            return 70;
        } else if (gpa >= scholarshipCGpa) {
            return 50;
        } else if (gpa >= scholarshipDGpa) {
            return 30;
        }
        return 0;
    }
}
