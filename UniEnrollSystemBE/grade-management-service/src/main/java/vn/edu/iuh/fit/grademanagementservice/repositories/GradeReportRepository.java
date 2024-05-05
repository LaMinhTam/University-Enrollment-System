package vn.edu.iuh.fit.grademanagementservice.repositories;


import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import vn.edu.iuh.fit.grademanagementservice.models.GradeReport;

@Repository
public interface GradeReportRepository extends MongoRepository<GradeReport, String>, CustomGradeReportRepository{

}
