package vn.edu.iuh.fit.enrollservice.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Course implements Serializable {
    private String id;
    private String name;
    private int credit;
    private int theoryCredit;
    private int practicalCredit;
    private List<Prerequisite> prerequisites;
}
