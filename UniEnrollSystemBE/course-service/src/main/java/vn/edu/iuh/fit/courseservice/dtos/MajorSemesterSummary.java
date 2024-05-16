package vn.edu.iuh.fit.courseservice.dtos;

public record MajorSemesterSummary(
        int year,
        int semester,
        int majorId,
        int totalMandatoryCredits,
        int totalElectiveCredits) {

}