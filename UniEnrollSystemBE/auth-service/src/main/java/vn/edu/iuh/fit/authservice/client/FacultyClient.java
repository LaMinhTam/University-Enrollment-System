package vn.edu.iuh.fit.authservice.client;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.service.annotation.GetExchange;
import org.springframework.web.service.annotation.HttpExchange;
import org.springframework.web.service.annotation.PostExchange;
import vn.edu.iuh.fit.authservice.dtos.StudentDTO;
import vn.edu.iuh.fit.authservice.models.Student;

@HttpExchange
public interface FacultyClient {
    @GetExchange("/student/hello")
    public ResponseEntity<?> hellowrod();

    @PostExchange("/student/register")
    Student registerUser(@RequestBody Student student);

    @GetExchange("/students/{id}")
    public StudentDTO get(@PathVariable String id);
}