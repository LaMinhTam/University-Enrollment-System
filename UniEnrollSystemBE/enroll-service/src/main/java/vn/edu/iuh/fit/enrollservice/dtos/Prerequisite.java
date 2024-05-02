package vn.edu.iuh.fit.enrollservice.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;

public record Prerequisite(
        String id,
        String name,
        int credit,
        int theoryCredit,
        int practicalCredit
) implements Serializable {
    @Serial
    private static final long serialVersionUID = -9168140803625611618L;
}
