package vn.edu.iuh.fit.scheduleservice.dtos;

import vn.edu.iuh.fit.scheduleservice.models.Schedule;

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