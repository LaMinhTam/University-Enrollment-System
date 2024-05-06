package vn.edu.iuh.fit.grademanagementservice.repositories;


import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import vn.edu.iuh.fit.grademanagementservice.models.GradeReport;
import vn.edu.iuh.fit.grademanagementservice.repositories.custom.CustomGradeReportRepository;

import java.util.List;

@Repository
public interface GradeReportRepository extends MongoRepository<GradeReport, String>, CustomGradeReportRepository {

    List<GradeReport> findByStudentId(String studentId);
}
