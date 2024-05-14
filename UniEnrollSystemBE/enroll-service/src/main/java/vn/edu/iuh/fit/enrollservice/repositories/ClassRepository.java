package vn.edu.iuh.fit.enrollservice.repositories;

import jakarta.persistence.Tuple;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import vn.edu.iuh.fit.enrollservice.dtos.ClassDTO;
import vn.edu.iuh.fit.enrollservice.models.Class;

import java.util.List;
import java.util.Optional;

public interface ClassRepository extends JpaRepository<Class, String> {
    public Optional<Class> findById(String id);

    @Query("SELECT c, COUNT(e.registryClass) AS quantity FROM Class c LEFT JOIN Enrollment e ON c.id = e.registryClass WHERE c.semester = ?1 AND c.year = ?2 GROUP BY c.id")
    List<Tuple> findBySemesterAndYear(int semester, int year);

    @Query("SELECT c.id, e.group, COUNT(e.registryClass) AS quantity FROM Class c LEFT JOIN Enrollment e ON c.id = e.registryClass WHERE c.semester = ?1 AND c.year = ?2 AND e.group IS NOT NULL AND e.group != 0 GROUP BY c.id, e.group")
    List<Tuple> findBySemesterAndYearGroupByClassIdAndGroup(int semester, int year);

    List<Class> findByIdIn(List<String> ids);
}
