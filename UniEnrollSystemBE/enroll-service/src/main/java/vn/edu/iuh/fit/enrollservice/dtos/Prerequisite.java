package vn.edu.iuh.fit.enrollservice.dtos;

public record Prerequisite(
        String id,
        String name,
        int credit,
        int theoryCredit,
        int practicalCredit
) {
}
