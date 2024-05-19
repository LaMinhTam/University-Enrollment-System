package vn.edu.iuh.fit.enrollservice.services.impl;

import org.springframework.dao.DataAccessException;
import org.springframework.data.redis.core.RedisOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.SessionCallback;
import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.enrollservice.dtos.ClassDTO;
import vn.edu.iuh.fit.enrollservice.dtos.ClassType;
import vn.edu.iuh.fit.enrollservice.dtos.MapCourseClass;
import vn.edu.iuh.fit.enrollservice.models.Class;
import vn.edu.iuh.fit.enrollservice.services.ClassRedisService;

import java.util.List;
import java.util.Map;

@Service
public class ClassRedisServiceImpl implements ClassRedisService {
    private final RedisTemplate<String, Object> redisTemplate;

    public ClassRedisServiceImpl(RedisTemplate<String, Object> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    @Override
    public Map<String, MapCourseClass> getAllCourses(int majorId, int semester, int year) {
        return (Map<String, MapCourseClass>) redisTemplate.opsForValue().get(majorId + "-" + semester + "-" + year);
    }

    @Override
    public void setAllCourses(int majorId, int semester, int year, Map<String, MapCourseClass> courses) {
        redisTemplate.opsForValue().set(majorId + "-" + semester + "-" + year, courses);
    }

    @Override
    public void updateStudentCount(int majorId, int semester, int year, String courseId, String classId, int group, int updateValue) throws Exception {
        String key = majorId + "-" + semester + "-" + year;

        while (true) {
            List<Object> results = redisTemplate.execute(new SessionCallback<List<Object>>() {
                public List<Object> execute(RedisOperations operations) throws DataAccessException {
                    operations.watch(key);
                    Map<String, MapCourseClass> coursesWithClasses = (Map<String, MapCourseClass>) operations.opsForValue().get(key);

                    ClassDTO targetClass = coursesWithClasses.get(courseId).classes().get(classId);

                    targetClass.setQuantity(targetClass.getQuantity() + updateValue);
                    if (group != 0) {
                        targetClass.getSchedules().stream()
                                .filter(schedule -> schedule.getGroup() == group)
                                .forEach(schedule -> schedule.setQuantity(schedule.getQuantity() + updateValue));
                    }

                    operations.multi();
                    operations.opsForValue().set(key, coursesWithClasses);
                    return operations.exec();
                }
            });

            if (results != null) {
                // The transaction was successful, so we can break out of the loop.
                break;
            }

            // The transaction failed because the watched key was changed.
            // We'll just loop and try the transaction again.
        }
    }
}
