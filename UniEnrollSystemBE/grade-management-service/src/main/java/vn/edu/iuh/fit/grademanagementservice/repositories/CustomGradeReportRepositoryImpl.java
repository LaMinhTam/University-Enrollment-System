package vn.edu.iuh.fit.grademanagementservice.repositories;

import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;
import vn.edu.iuh.fit.grademanagementservice.models.GradeReport;

public class CustomGradeReportRepositoryImpl implements CustomGradeReportRepository {
    private final MongoTemplate mongoTemplate;

    public CustomGradeReportRepositoryImpl(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }


    @Override
    public GradeReport findByStudentIdAndClassId(String studentId, String classId) {
        Query query = new Query();
        query.addCriteria(Criteria.where("student_id").is(studentId).and("class_id").is(classId));
        return mongoTemplate.findOne(query, GradeReport.class);
    }
}
