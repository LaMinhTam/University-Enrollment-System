package vn.edu.iuh.fit.scheduleservice.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import vn.edu.iuh.fit.scheduleservice.models.ClassSchedule;

import java.util.List;

public interface ClassScheduleRepository extends MongoRepository<ClassSchedule, String> {
    List<ClassSchedule> findByClassIdIn(List<String> classIds);
}