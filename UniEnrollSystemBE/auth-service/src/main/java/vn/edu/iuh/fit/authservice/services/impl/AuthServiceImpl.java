package vn.edu.iuh.fit.authservice.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import vn.edu.iuh.fit.authservice.JwtUtil;
import vn.edu.iuh.fit.authservice.client.StudentClient;
import vn.edu.iuh.fit.authservice.dtos.AuthRequest;
import vn.edu.iuh.fit.authservice.models.Student;
import vn.edu.iuh.fit.authservice.repositories.StudentRepository;
import vn.edu.iuh.fit.authservice.services.AuthService;

import java.util.Optional;

@Service
public class AuthServiceImpl implements AuthService {
    private final StudentRepository studentRepository;
    private final StudentClient studentClient;

    @Autowired
    public AuthServiceImpl(StudentRepository studentRepository, StudentClient studentClient) {
        this.studentRepository = studentRepository;
        this.studentClient = studentClient;
    }

//    public AuthResponse register(Student student) {
//        //do validation if user already exists
//        student.setPassword(BCrypt.hashpw(student.getPassword(), BCrypt.gensalt()));
//
//        Student studentVO = studentClient.registerUser(student);
//        Assert.notNull(studentVO, "Failed to register user. Please try again later");
//
//        String accessToken = jwt.generate(student, "ACCESS");
//        String refreshToken = jwt.generate(student, "REFRESH");
//
//        return new AuthResponse(accessToken, refreshToken);
//    }

    public Object helloworld() {
        return studentClient.hellowrod();
    }

    public Optional<Student> getStudentById(AuthRequest authRequest) {
        return studentRepository.findById(authRequest.username());
    }
}
