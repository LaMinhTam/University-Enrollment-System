package vn.edu.iuh.fit.facultyservice.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import vn.edu.iuh.fit.facultyservice.dtos.StudentDTO;
import vn.edu.iuh.fit.facultyservice.models.Student;
import vn.edu.iuh.fit.facultyservice.services.StudentService;

import java.util.Optional;

@RestController
@RequestMapping("/students")
public class StudentController {
    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping("/{id}")
    public StudentDTO get(@PathVariable String id) {
        Student student = studentService.get(id);
        return new StudentDTO(student.getId(),
                student.getName(),
                student.getMajor().getId(),
                student.getMajor().getName(),
                student.getYear(),
                student.getMajor().getFaculty().getId(),
                student.getMajor().getFaculty().getName(),
                student.getMail());
    }
}
