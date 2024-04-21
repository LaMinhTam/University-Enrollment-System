package vn.edu.iuh.fit.studentservice;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/student")
public class StudentController {
    @GetMapping("/hello")
    public ResponseEntity<?> hellowrod() {
        ResponseWrapper response = new ResponseWrapper(200, "Hello world", new ResponseStudent("Nguyen Van A", "123 Nguyen Hue", "0123456789"));
        return ResponseEntity.ok(response);
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