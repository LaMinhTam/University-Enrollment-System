package vn.edu.iuh.fit.scheduleservice.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Schedule {
    private int dayOfWeek;
    private String timeSlot;
    private Date startDate;
    private Date endDate;
    private String room;
    private String location;
    private String lecturer;
    private int group;
    private ClassType classType;
    private List<Date> dayOff;
}
