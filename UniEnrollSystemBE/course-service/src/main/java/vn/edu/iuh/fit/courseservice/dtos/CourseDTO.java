package vn.edu.iuh.fit.courseservice.dtos;

import lombok.Data;

@Data
public class CourseDTO {
    private String id;
    private String name;
    private int credit;
    private int theoryCredit;
    private int practicalCredit;
    private int type;
}