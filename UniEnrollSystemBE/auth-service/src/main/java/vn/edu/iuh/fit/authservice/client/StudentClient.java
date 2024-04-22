package vn.edu.iuh.fit.authservice.client;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.service.annotation.GetExchange;
import org.springframework.web.service.annotation.HttpExchange;
import org.springframework.web.service.annotation.PostExchange;
import vn.edu.iuh.fit.authservice.models.Student;

import java.util.Optional;

@HttpExchange
public interface StudentClient {
    @GetExchange("/student/hello")
    public ResponseEntity<?> hellowrod();

    @PostExchange("/student/register")
    Student registerUser(@RequestBody Student student);
}