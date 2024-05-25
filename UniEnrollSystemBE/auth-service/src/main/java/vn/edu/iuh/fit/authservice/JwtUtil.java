package vn.edu.iuh.fit.authservice;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import vn.edu.iuh.fit.authservice.dtos.StudentDTO;
import vn.edu.iuh.fit.authservice.models.Student;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.access-expiration}")
    private String expirationTime;
    private Key key;

    @PostConstruct
    public void init() {
        this.key = Keys.hmacShaKeyFor(secret.getBytes());
    }

    public Claims getAllClaimsFromToken(String token) {
        return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
    }


    public Date getExpirationDateFromToken(String token) {
        return getAllClaimsFromToken(token).getExpiration();
    }

    public boolean isTokenExpired(String token) {
        final Date expiration = getExpirationDateFromToken(token);
        return expiration.before(new Date());
    }

    public String generate(StudentDTO studentDTO, Student student, String type) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("id", student.getId());
        if ("ACCESS".equals(type)) {
            claims.put("major_id", studentDTO.majorId());
            claims.put("academic_year", studentDTO.year());
            claims.put("role", student.getRoles().stream().findFirst().get().getName());
        }
        claims.put("type", type);
        return doGenerateToken(claims, student.getId(), type);
    }

    private String doGenerateToken(Map<String, Object> claims, String id, String type) {
        long expirationTimeLong;
        if ("ACCESS".equals(type)) {
            expirationTimeLong = Long.parseLong(expirationTime) * 1000;
        } else {
            expirationTimeLong = Long.parseLong(expirationTime) * 1000 * 8;
        }
        final Date createdDate = new Date();
        final Date expirationDate = new Date(createdDate.getTime() + expirationTimeLong);

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(id)
                .setIssuedAt(createdDate)
                .setExpiration(expirationDate)
                .signWith(key)
                .compact();
    }

    public Boolean validateToken(String token) {
        return !isTokenExpired(token);
    }

    public String extractStudentFromRefreshToken(String refreshToken) {
        Claims claims = getAllClaimsFromToken(refreshToken);
        return claims.get("id").toString();
    }
}

