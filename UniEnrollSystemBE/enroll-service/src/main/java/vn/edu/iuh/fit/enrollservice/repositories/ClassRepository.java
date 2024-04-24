package vn.edu.iuh.fit.enrollservice.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import vn.edu.iuh.fit.enrollservice.models.Class;

import java.util.List;
import java.util.Optional;

public interface ClassRepository extends MongoRepository<Class, String> {
    @Query("{id: ?0}")
    public Optional<Class> findById(String id);

    List<Class> findBySemesterAndYear(int semester, int year);
}
