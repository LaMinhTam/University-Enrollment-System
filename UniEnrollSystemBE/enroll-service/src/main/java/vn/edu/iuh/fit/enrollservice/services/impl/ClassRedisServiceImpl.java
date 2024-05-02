package vn.edu.iuh.fit.enrollservice.services.impl;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
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
    public void validateClassAndGroupForRegistration(int majorId, Class targetClass, int group) throws Exception {
        Map<String, MapCourseClass> coursesWithClasses = (Map<String, MapCourseClass>) redisTemplate.opsForValue().get(majorId + "-" + targetClass.getSemester() + "-" + targetClass.getYear());
        if (coursesWithClasses == null || coursesWithClasses.isEmpty()) {
            throw new Exception("Hệ thống hiện đang lỗi, vui lòng thử lại sau");
        } else if (group != 0) {
            // For each class in the course, check if the class ID matches the new class ID
            // Then, for each schedule in the class, check if the group and class type match the request
            // If a matching schedule is found, throw an exception
            boolean isMatchFound = coursesWithClasses.get(targetClass.getCourseId()).classes().stream()
                    .filter(classObject -> classObject.getId().equals(targetClass.getId()))
                    .flatMap(classObject -> classObject.getSchedules().stream())
                    .anyMatch(schedule -> schedule.group() == group && schedule.classType() == ClassType.PRACTICE);

            if (!isMatchFound) {
                throw new RuntimeException("Nhóm thực hành không tồn tại");
            }
        } else if (coursesWithClasses.get(targetClass.getCourseId()).course().practicalCredit() != 0) {
            throw new RuntimeException("Hãy đăng ký nhóm thực hành");
        }
    }

    @Override
    public void setAllCourses(int majorId, int semester, int year, Map<String, MapCourseClass> courses) {
        redisTemplate.opsForValue().set(majorId + "-" + semester + "-" + year, courses);
    }

    @Override
    public void clearCache(int majorId, int semester, int year) {
        redisTemplate.delete(majorId + "-" + semester + "-" + year);
    }
}
