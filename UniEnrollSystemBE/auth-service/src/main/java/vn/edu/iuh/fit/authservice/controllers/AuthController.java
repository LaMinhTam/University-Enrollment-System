package vn.edu.iuh.fit.authservice.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.iuh.fit.authservice.client.StudentClient;
import vn.edu.iuh.fit.authservice.models.AuthResponse;
import vn.edu.iuh.fit.authservice.models.StudentVO;
import vn.edu.iuh.fit.authservice.services.AuthService;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;
    private final StudentClient studentClient;
    @Autowired
    public AuthController(final AuthService authService, StudentClient studentClient) {
        this.authService = authService;
        this.studentClient = studentClient;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody StudentVO student) {
        return ResponseEntity.ok(authService.register(student));
    }

    @GetMapping("/hello")
    public ResponseEntity<?> helloworld() {
        return ResponseEntity.ok(authService.helloworld());
    }

}