package vn.edu.iuh.fit.enrollservice.dtos;

import java.util.Date;
import java.util.List;

public record Schedule(
        int dayOfWeek,
        String timeSlot,
        Date startDate,
        Date endDate,
        String room,
        String location,
        String lecturer,
        ClassType classType,
        List<Date> dayOff
) {
}

