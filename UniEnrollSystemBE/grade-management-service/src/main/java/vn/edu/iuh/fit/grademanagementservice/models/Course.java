package vn.edu.iuh.fit.grademanagementservice.models;

public record Course(
        String id,
        String name,
        int credit,
        int theoryCredit,
        int practicalCredit,
        int type
) {
}
