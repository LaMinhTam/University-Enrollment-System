package vn.edu.iuh.fit.enrollservice.dtos;

public record Course(
        String id,
        String name,
        int credit,
        int theoryCredit,
        int practicalCredit
) {
}
