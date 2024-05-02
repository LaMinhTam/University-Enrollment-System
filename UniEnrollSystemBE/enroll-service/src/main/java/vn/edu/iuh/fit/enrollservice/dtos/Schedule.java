package vn.edu.iuh.fit.enrollservice.dtos;

import java.io.Serial;
import java.io.Serializable;
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
        int group,
        List<Date> dayOff
) implements Serializable {
    @Serial
    private static final long serialVersionUID = -2423606727194085087L;
}

