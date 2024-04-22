package vn.edu.iuh.fit.authservice.models;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class StudentVO {
    private String id;
    private String fullName;
    private String password;
    private String photos;
    private int role;
}