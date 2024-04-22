package vn.edu.iuh.fit.studentservice.controllers;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.iuh.fit.studentservice.DTO.StudentDTO;
import vn.edu.iuh.fit.studentservice.models.Student;
import vn.edu.iuh.fit.studentservice.services.StudentService;

@RestController
@RequestMapping("/student")
public class StudentController {
    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping("/hello")
    public ResponseEntity<?> hellowrod() {
        ResponseWrapper response = new ResponseWrapper(200, "Hello world", new ResponseStudent("Nguyen Van A", "123 Nguyen Hue", "0123456789"));
        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody StudentDTO student) {
        studentService.save(student);
        return ResponseEntity.ok(student);
    }
}

@Data
@NoArgsConstructor
@AllArgsConstructor
class ResponseStudent {
    private String name;
    private String address;
    private String phone;
}

record ResponseWrapper(int status, String message, Object data) {
}