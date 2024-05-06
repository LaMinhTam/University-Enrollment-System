package vn.edu.iuh.fit.grademanagementservice.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import vn.edu.iuh.fit.grademanagementservice.models.SemesterSummary;
import vn.edu.iuh.fit.grademanagementservice.repositories.custom.CustomSemesterSummaryRepository;

public interface SemesterSummaryRepository extends MongoRepository<SemesterSummary, String>, CustomSemesterSummaryRepository {
}
