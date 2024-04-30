package vn.edu.iuh.fit.enrollservice.dtos;

import java.util.List;

public record Course(
        String id,
        String name,
        int credit,
        int theoryCredit,
        int practicalCredit,
        List<Prerequisite> prerequisites
) {
}
