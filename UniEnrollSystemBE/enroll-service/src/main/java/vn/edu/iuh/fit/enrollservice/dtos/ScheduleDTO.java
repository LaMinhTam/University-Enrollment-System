package vn.edu.iuh.fit.enrollservice.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ScheduleDTO implements Serializable {
    @Serial
    private static final long serialVersionUID = -2423606727194085087L;
    private int dayOfWeek;
    private String timeSlot;
    private Date startDate;
    private Date endDate;
    private String room;
    private String location;
    private String lecturer;
    private ClassType classType;
    private int group;
    private List<Date> dayOff;
    private int quantity = 0;

    public ScheduleDTO(Schedule schedule, Long quantity) {
        this.dayOfWeek = schedule.dayOfWeek();
        this.timeSlot = schedule.timeSlot();
        this.startDate = schedule.startDate();
        this.endDate = schedule.endDate();
        this.room = schedule.room();
        this.location = schedule.location();
        this.lecturer = schedule.lecturer();
        this.classType = schedule.classType();
        this.group = schedule.group();
        this.dayOff = schedule.dayOff();
        this.quantity = quantity == null ? 0 : quantity.intValue();
    }
}

