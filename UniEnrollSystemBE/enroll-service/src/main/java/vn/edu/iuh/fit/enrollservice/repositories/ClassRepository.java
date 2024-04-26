package vn.edu.iuh.fit.enrollservice.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.edu.iuh.fit.enrollservice.models.Class;

import java.util.List;
import java.util.Optional;

public interface ClassRepository extends JpaRepository<Class, String> {
    public Optional<Class> findById(String id);

    List<Class> findBySemesterAndYear(int semester, int year);
}
