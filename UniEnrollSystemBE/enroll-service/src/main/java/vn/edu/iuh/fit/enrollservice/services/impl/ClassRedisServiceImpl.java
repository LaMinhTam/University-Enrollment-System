package vn.edu.iuh.fit.enrollservice.services.impl;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.enrollservice.dtos.MapCourseClass;
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
    public Map<String , MapCourseClass> getAllCourses(int majorId, int semester, int year) {
        redisTemplate.delete(majorId + "-" + semester + "-" + year);
        return (Map<String, MapCourseClass>) redisTemplate.opsForValue().get(majorId + "-" + semester + "-" + year);
    }

    @Override
    public void setAllCourses(int majorId, int semester, int year, Map<String , MapCourseClass> courses) {
        redisTemplate.opsForValue().set(majorId + "-" + semester + "-" + year, courses);
    }
}
