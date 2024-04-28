package vn.edu.iuh.fit.scheduleservice.dtos;

import lombok.Data;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
public class WeekScheduleDTO implements Serializable {
    private Date date;
    private List<QueryClassSchedule> schedule;

    public WeekScheduleDTO(Date date) {
        this.date = date;
        this.schedule = new ArrayList<>();
    }

    public void addSchedule(QueryClassSchedule schedule) {
        this.schedule.add(schedule);
    }
}
