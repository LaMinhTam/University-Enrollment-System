package vn.edu.iuh.fit.facultyservice.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.edu.iuh.fit.facultyservice.models.MajorSemesterSummary;
import vn.edu.iuh.fit.facultyservice.models.MajorSemesterSummaryId;

import java.util.List;

public interface MajorSemesterSummaryRepository extends JpaRepository<MajorSemesterSummary, MajorSemesterSummaryId> {
    List<MajorSemesterSummary> findAllByMajorIdAndYearOrderBySemester(int majorId, int year);
}
