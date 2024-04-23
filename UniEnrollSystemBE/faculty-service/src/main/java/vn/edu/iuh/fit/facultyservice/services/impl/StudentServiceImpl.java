package vn.edu.iuh.fit.facultyservice.services.impl;

import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.facultyservice.models.Student;
import vn.edu.iuh.fit.facultyservice.repositories.StudentRepository;
import vn.edu.iuh.fit.facultyservice.services.StudentService;

import java.util.Optional;

@Service
public class StudentServiceImpl implements StudentService {
    private final StudentRepository studentRepository;

    public StudentServiceImpl(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @Override
    public Student get(String id) {
        return studentRepository.findById(id).get();
    }
}
