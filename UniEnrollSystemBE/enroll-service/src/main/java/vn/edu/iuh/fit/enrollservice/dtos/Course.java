package vn.edu.iuh.fit.enrollservice.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;

public record Course(
        String id,
        String name,
        int credit,
        int theoryCredit,
        int practicalCredit,
        int type,
        List<Prerequisite> prerequisites
) implements Serializable {
    @Serial
    private static final long serialVersionUID = -8018000929067078059L;
}
