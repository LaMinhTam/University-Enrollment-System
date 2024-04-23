package vn.edu.iuh.fit.authservice.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.web.bind.annotation.*;
import vn.edu.iuh.fit.authservice.JwtUtil;
import vn.edu.iuh.fit.authservice.client.FacultyClient;
import vn.edu.iuh.fit.authservice.dtos.AuthRequest;
import vn.edu.iuh.fit.authservice.dtos.AuthResponse;
import vn.edu.iuh.fit.authservice.dtos.ResponseWrapper;
import vn.edu.iuh.fit.authservice.dtos.StudentDTO;
import vn.edu.iuh.fit.authservice.models.Student;
import vn.edu.iuh.fit.authservice.services.impl.AuthServiceImpl;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthServiceImpl authService;
    private final FacultyClient facultyClient;
    private final JwtUtil jwt;

    @Autowired
    public AuthController(final AuthServiceImpl authService, FacultyClient facultyClient, JwtUtil jwt) {
        this.authService = authService;
        this.facultyClient = facultyClient;
        this.jwt = jwt;
    }

//    @PostMapping("/register")
//    public ResponseEntity<AuthResponse> register(@RequestBody Student student) {
//        return ResponseEntity.ok(authService.register(student));
//    }

    @GetMapping("/hello")
    public ResponseEntity<?> helloworld() {
        return ResponseEntity.ok(authService.helloworld());
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest authRequest) {
        Optional<Student> student = authService.getStudentById(authRequest);
        if (student.isPresent() && BCrypt.checkpw(authRequest.password(), student.get().getPassword())) {
            String accessToken = jwt.generate(student.get(), "ACCESS");
            String refreshToken = jwt.generate(student.get(), "REFRESH");
            StudentDTO studentDTO = facultyClient.get(student.get().getId());
            return ResponseEntity.ok(
                    new ResponseWrapper("Đăng nhập thành công",
                            new AuthResponse(
                                    studentDTO,
                                    accessToken,
                                    refreshToken),
                            HttpStatus.OK.value()
                    ));
        }
        return ResponseEntity.badRequest().body(new ResponseWrapper("Sai tên hoặc mật kẩu", null, HttpStatus.BAD_REQUEST.value()));
    }
}