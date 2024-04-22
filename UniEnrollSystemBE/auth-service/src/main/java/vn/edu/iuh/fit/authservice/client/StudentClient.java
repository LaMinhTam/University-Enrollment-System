package vn.edu.iuh.fit.authservice.client;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.service.annotation.GetExchange;
import org.springframework.web.service.annotation.HttpExchange;
import org.springframework.web.service.annotation.PostExchange;
import vn.edu.iuh.fit.authservice.models.StudentVO;

@HttpExchange
public interface StudentClient {
    @GetExchange("/student/hello")
    public ResponseEntity<?> hellowrod();

    @PostExchange("/student/register")
    StudentVO registerUser(@RequestBody StudentVO student);
}