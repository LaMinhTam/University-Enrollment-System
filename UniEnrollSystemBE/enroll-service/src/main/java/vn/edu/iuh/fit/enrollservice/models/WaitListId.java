package vn.edu.iuh.fit.enrollservice.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WaitListId implements Serializable {
    private String studentId;
    private String courseId;
    private int semester;
    private int year;
}
