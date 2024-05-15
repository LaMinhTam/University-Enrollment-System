package vn.edu.iuh.fit.authservice.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.authservice.client.FacultyClient;
import vn.edu.iuh.fit.authservice.dtos.AuthRequest;
import vn.edu.iuh.fit.authservice.models.Student;
import vn.edu.iuh.fit.authservice.models.Token;
import vn.edu.iuh.fit.authservice.repositories.StudentRepository;
import vn.edu.iuh.fit.authservice.repositories.TokenRepository;
import vn.edu.iuh.fit.authservice.services.AuthService;

import java.util.Optional;

@Service
public class AuthServiceImpl implements AuthService {
    private final StudentRepository studentRepository;
    private final FacultyClient facultyClient;
    private final TokenRepository tokenRepository;

    @Autowired
    public AuthServiceImpl(StudentRepository studentRepository, FacultyClient facultyClient, TokenRepository tokenRepository) {
        this.studentRepository = studentRepository;
        this.facultyClient = facultyClient;
        this.tokenRepository = tokenRepository;
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

    public Optional<Student> getStudentById(String id) {
        return studentRepository.findById(id);
    }

    public boolean validRefreshToken(String studentId, String refreshToken) {
        return tokenRepository.findById(studentId).map(token -> token.getRefreshToken().equals(refreshToken)).orElse(false);
    }

    public void saveRefreshToken(String id, String refreshToken) {
        tokenRepository.save(new Token(id, refreshToken));
    }
}
