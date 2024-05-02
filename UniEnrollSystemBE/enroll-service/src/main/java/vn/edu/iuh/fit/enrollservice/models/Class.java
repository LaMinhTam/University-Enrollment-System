package vn.edu.iuh.fit.enrollservice.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;

@Entity
@Table(name = "classes")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Class implements Serializable {
    @Serial
    private static final long serialVersionUID = -5421890207543864922L;
    @Id
    private String id;
    private String courseId;
    private String courseName;
    private int semester;
    private int year;
    private int maxCapacity;
    @Enumerated(EnumType.STRING)
    private ClassStatus status;

    public void setClassDetails(Class classById) {
        this.id = classById.getId();
        this.courseId = classById.getCourseId();
        this.courseName = classById.getCourseName();
        this.semester = classById.getSemester();
        this.year = classById.getYear();
        this.maxCapacity = classById.getMaxCapacity();
        this.status = classById.getStatus();
    }
}
