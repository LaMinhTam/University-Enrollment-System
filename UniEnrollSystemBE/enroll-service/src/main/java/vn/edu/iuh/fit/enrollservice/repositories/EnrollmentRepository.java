package vn.edu.iuh.fit.enrollservice.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import vn.edu.iuh.fit.enrollservice.models.Enrollment;
import vn.edu.iuh.fit.enrollservice.models.EnrollmentClassId;

import java.util.Optional;

@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollment, EnrollmentClassId> {
    Optional<Enrollment> findByStudentIdAndRegistryClass(String studentId, String classId);

    @Procedure("register_class")
    int registerClass(@Param("p_student_id") String studentId, @Param("p_class_id") String classId);
}
