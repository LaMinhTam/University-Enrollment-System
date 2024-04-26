package vn.edu.iuh.fit.enrollservice.dtos;

import java.util.List;

public record ClassSchedule (
     String classId,
     List<Schedule> schedules
){}