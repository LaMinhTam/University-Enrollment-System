package vn.edu.iuh.fit.authservice.services;

import vn.edu.iuh.fit.authservice.models.Student;

import java.util.Optional;

public interface AuthService {
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
    Optional<Student> getStudentById(String id);
}
