package vn.edu.iuh.fit.authservice.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import vn.edu.iuh.fit.authservice.JwtUtil;
import vn.edu.iuh.fit.authservice.client.StudentClient;
import vn.edu.iuh.fit.authservice.models.AuthResponse;
import vn.edu.iuh.fit.authservice.models.StudentVO;
import vn.edu.iuh.fit.authservice.models.UserVO;

@Service
public class AuthService {

    private final StudentClient studentClient;
    private final JwtUtil jwt;

    @Autowired
    public AuthService(StudentClient studentClient, final JwtUtil jwt) {
        this.studentClient = studentClient;
        this.jwt = jwt;
    }

    public AuthResponse register(StudentVO student) {
        //do validation if user already exists
        student.setPassword(BCrypt.hashpw(student.getPassword(), BCrypt.gensalt()));

        StudentVO studentVO = studentClient.registerUser(student);
        Assert.notNull(studentVO, "Failed to register user. Please try again later");

        String accessToken = jwt.generate(studentVO, "ACCESS");
        String refreshToken = jwt.generate(studentVO, "REFRESH");

        return new AuthResponse(accessToken, refreshToken);
    }

    public Object helloworld() {
        return studentClient.hellowrod();
    }
}
