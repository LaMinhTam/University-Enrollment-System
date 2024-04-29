package vn.edu.iuh.fit.enrollservice.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@IdClass(WaitListId.class)
public class WaitList {
    @Id
    private String studentId;
    @Id
    private String courseId;
    @Id
    private int semester;
    @Id
    private int year;
    private Date createdAt;
}
