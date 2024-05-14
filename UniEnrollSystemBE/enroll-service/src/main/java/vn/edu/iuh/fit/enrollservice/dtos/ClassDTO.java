package vn.edu.iuh.fit.enrollservice.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import vn.edu.iuh.fit.enrollservice.models.Class;
import vn.edu.iuh.fit.enrollservice.models.ClassStatus;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ClassDTO implements Serializable {
    @Serial
    private static final long serialVersionUID = 2947067840798856153L;
    private String id;
    private String courseId;
    private String courseName;
    private int semester;
    private int year;
    private int maxCapacity;
    private ClassStatus status;
    private Long quantity;
    private List<ScheduleDTO> schedules;
    public ClassDTO(Class newClass, Long quantity) {
        this.id = newClass.getId();
        this.courseId = newClass.getCourseId();
        this.courseName = newClass.getCourseName();
        this.semester = newClass.getSemester();
        this.year = newClass.getYear();
        this.maxCapacity = newClass.getMaxCapacity();
        this.status = newClass.getStatus();
        this.quantity = quantity;
    }

    public void setClass(Class classObject) {
        this.id = classObject.getId();
        this.courseId = classObject.getCourseId();
        this.courseName = classObject.getCourseName();
        this.semester = classObject.getSemester();
        this.year = classObject.getYear();
        this.maxCapacity = classObject.getMaxCapacity();
        this.status = classObject.getStatus();
    }
}
