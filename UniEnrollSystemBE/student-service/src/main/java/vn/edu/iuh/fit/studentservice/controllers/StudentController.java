package vn.edu.iuh.fit.studentservice.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.iuh.fit.studentservice.DTO.ResponseWrapper;
import vn.edu.iuh.fit.studentservice.DTO.StudentDTO;
import vn.edu.iuh.fit.studentservice.mappers.StudentToDTO;
import vn.edu.iuh.fit.studentservice.models.Student;
import vn.edu.iuh.fit.studentservice.services.StudentService;

import java.util.Optional;

@RestController
@RequestMapping("/student")
public class StudentController {
    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping("/hello")
    public ResponseEntity<?> hellowrod() {
        ResponseWrapper response = new ResponseWrapper(200, "Hello world", new StudentDTO("1", "Nguyen Van A", "123456", "photo.jpg", "ROLE_STUDENT"));
        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody StudentDTO student) {
        studentService.save(student);
        return ResponseEntity.ok(student);
    }

    @GetMapping("/{id}")
    public Optional<StudentDTO> getUser(@PathVariable String id) {
        Optional<Student> student = studentService.findById(id);
        return student.map(StudentToDTO::toDTO);
    }
}

