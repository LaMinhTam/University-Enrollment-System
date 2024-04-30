package vn.edu.iuh.fit.enrollservice.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Prerequisite implements Serializable {
    private String id;
    private String name;
    private int credit;
    private int theoryCredit;
    private int practicalCredit;
}
