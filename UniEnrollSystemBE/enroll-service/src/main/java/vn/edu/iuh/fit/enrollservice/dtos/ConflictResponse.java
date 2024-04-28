package vn.edu.iuh.fit.enrollservice.dtos;

public record ConflictResponse(
        String existingClassId,
        String existingCourseId,
        String existingCourseName,
        Schedule existingSchedule,
        String newClassId,
        String newCourseId,
        String newCourseName,
        Schedule newSchedule
) {
}