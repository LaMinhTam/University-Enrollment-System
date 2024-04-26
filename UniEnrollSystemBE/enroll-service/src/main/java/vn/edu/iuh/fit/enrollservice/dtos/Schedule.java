package vn.edu.iuh.fit.enrollservice.dtos;

import java.util.Date;

public record Schedule(
        int dayOfWeek,
        String timeSlot,
        Date startDate,
        Date endDate,
        String room,
        String location,
        String lecturer,
        ClassType classType) {
}

