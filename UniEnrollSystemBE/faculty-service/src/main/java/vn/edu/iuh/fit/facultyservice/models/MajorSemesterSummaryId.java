package vn.edu.iuh.fit.facultyservice.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MajorSemesterSummaryId implements Serializable {
    private int year;
    private int semester;
    private int majorId;
}
