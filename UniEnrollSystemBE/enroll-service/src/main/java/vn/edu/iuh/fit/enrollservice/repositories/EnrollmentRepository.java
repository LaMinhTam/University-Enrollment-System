package vn.edu.iuh.fit.enrollservice.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import vn.edu.iuh.fit.enrollservice.models.Enrollment;

import java.util.Optional;

@Repository
public interface EnrollmentRepository extends MongoRepository<Enrollment, String>{
    Optional<Enrollment> findByStudentIdAndRegistryClass(String studentId, String classId);

    int countByStudentIdAndRegistryClass(String studentId, String classId);
}
