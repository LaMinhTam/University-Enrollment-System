package vn.edu.iuh.fit.enrollservice.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Course implements Serializable {
    @Serial
    private static final long serialVersionUID = -8018000929067078059L;
    private String id;
    private String name;
    private int credit;
    private int theoryCredit;
    private int practicalCredit;
    private int type;
    private List<Prerequisite> prerequisites;
    private Double fee;
}
