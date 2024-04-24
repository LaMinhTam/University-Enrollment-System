package vn.edu.iuh.fit.scheduleservice.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.scheduleservice.models.ClassSchedule;
import vn.edu.iuh.fit.scheduleservice.models.StudentSchedule;
import vn.edu.iuh.fit.scheduleservice.repositories.ClassScheduleRepository;
import vn.edu.iuh.fit.scheduleservice.repositories.StudentScheduleRepository;
import vn.edu.iuh.fit.scheduleservice.services.ClassScheduleService;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ClassScheduleServiceImpl implements ClassScheduleService {
    private final StudentScheduleRepository studentScheduleRepository;
    private final ClassScheduleRepository classScheduleRepository;

    @Autowired
    public ClassScheduleServiceImpl(StudentScheduleRepository studentScheduleRepository,
                                    ClassScheduleRepository classScheduleRepository) {
        this.studentScheduleRepository = studentScheduleRepository;
        this.classScheduleRepository = classScheduleRepository;
    }

    @Override
    public List<ClassSchedule> getAllSchedule(String studentId) {
        // Retrieve student schedules based on studentId
        List<StudentSchedule> studentSchedules = studentScheduleRepository.findByStudentId(studentId);

        List<String> classIds = studentSchedules.stream()
                .map(StudentSchedule::getClassId)
                .collect(Collectors.toList());

        // Retrieve class schedules associated with the extracted courseIds
        return classScheduleRepository.findByClassIdIn(classIds);
    }

    @Override
    public List<ClassSchedule> registrySchedule(String studentId, String courseId) {
        StudentSchedule studentSchedule = studentScheduleRepository.save(new StudentSchedule(studentId, courseId));
        return classScheduleRepository.findByClassIdIn(List.of(studentSchedule.getClassId()));
    }

    @Override
    public void cancelSchedule(String studentId, String classId) {
        studentScheduleRepository.deleteByStudentIdAndClassId(studentId, classId);
    }
}
