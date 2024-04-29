package vn.edu.iuh.fit.enrollservice.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.edu.iuh.fit.enrollservice.models.Enrollment;
import vn.edu.iuh.fit.enrollservice.models.WaitList;
import vn.edu.iuh.fit.enrollservice.models.WaitListId;

import java.util.List;
import java.util.Optional;

public interface WaitListRepository extends JpaRepository<WaitList, WaitListId> {
    public List<WaitList> findByStudentIdAndSemesterAndYear(String studentId, int semester, int year);
}
