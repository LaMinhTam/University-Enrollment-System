package vn.edu.iuh.fit.authservice.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.web.bind.annotation.*;
import vn.edu.iuh.fit.authservice.JwtUtil;
import vn.edu.iuh.fit.authservice.client.FacultyClient;
import vn.edu.iuh.fit.authservice.dtos.*;
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
        Optional<Student> student = authService.getStudentById(authRequest.username());
        if (student.isPresent() && BCrypt.checkpw(authRequest.password(), student.get().getPassword())) {
            StudentDTO studentDTO = facultyClient.get(student.get().getId());
            String accessToken = jwt.generate(studentDTO, student.get(), "ACCESS");
            String refreshToken = jwt.generate(studentDTO, student.get(), "REFRESH");
            authService.saveRefreshToken(student.get().getId(), refreshToken);
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

    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshToken(@RequestBody RefreshTokenRequest refreshToken) {
        String studentId = jwt.extractStudentFromRefreshToken(refreshToken.refreshToken());
        if (!jwt.isTokenExpired(refreshToken.refreshToken()) && authService.validRefreshToken(studentId, refreshToken.refreshToken())) {
            Student student = authService.getStudentById(studentId).get();
            StudentDTO studentDTO = facultyClient.get(student.getId());
            String newAccessToken = jwt.generate(studentDTO, student, "ACCESS");
            String newRefreshToken = jwt.generate(studentDTO, student, "REFRESH");
            authService.saveRefreshToken(student.getId(), newRefreshToken);
            return ResponseEntity.ok(
                    new ResponseWrapper("Phiên đăng nhập được mở rộng",
                            new AuthResponse(studentDTO, newAccessToken, newRefreshToken),
                            HttpStatus.OK.value()));
        }
        return ResponseEntity.badRequest().body(
                new ResponseWrapper("Lỗi phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.", null, HttpStatus.UNAUTHORIZED.value()));
    }
}