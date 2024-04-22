package vn.edu.iuh.fit.studentservice.services.impl;

import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.studentservice.DTO.StudentDTO;
import vn.edu.iuh.fit.studentservice.models.Student;
import vn.edu.iuh.fit.studentservice.repositories.StudentRepository;
import vn.edu.iuh.fit.studentservice.services.StudentService;

import java.util.Optional;

@Service
public class StudentServiceImpl implements StudentService {
    private final StudentRepository studentRepository;

    public StudentServiceImpl(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @Override
    public Student save(StudentDTO studentDTO) {
        Student student = new Student(studentDTO);
        return studentRepository.save(student);
    }

    @Override
    public Optional<Student> findById(String id) {
        return studentRepository.findById(id);
    }
}
