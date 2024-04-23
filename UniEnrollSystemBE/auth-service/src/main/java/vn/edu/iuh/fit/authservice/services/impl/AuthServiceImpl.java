package vn.edu.iuh.fit.authservice.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.authservice.client.FacultyClient;
import vn.edu.iuh.fit.authservice.dtos.AuthRequest;
import vn.edu.iuh.fit.authservice.models.Student;
import vn.edu.iuh.fit.authservice.repositories.StudentRepository;
import vn.edu.iuh.fit.authservice.services.AuthService;

import java.util.Optional;

@Service
public class AuthServiceImpl implements AuthService {
    private final StudentRepository studentRepository;
    private final FacultyClient facultyClient;

    @Autowired
    public AuthServiceImpl(StudentRepository studentRepository, FacultyClient facultyClient) {
        this.studentRepository = studentRepository;
        this.facultyClient = facultyClient;
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
        return facultyClient.hellowrod();
    }

    public Optional<Student> getStudentById(AuthRequest authRequest) {
        return studentRepository.findById(authRequest.username());
    }
}
