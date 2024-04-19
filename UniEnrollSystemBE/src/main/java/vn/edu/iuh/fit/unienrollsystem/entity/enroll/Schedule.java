package vn.edu.iuh.fit.unienrollsystem.entity.enroll;

import jakarta.persistence.*;

@Entity
@Table(name = "schedule")
public class Schedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "class_id")
    private Class enrolledClass;

    private int dayOfWeek;

    @Column(name = "start_time_slot")
    private int startTimeSlot;

    @Column(name = "end_time_slot")
    private int endTimeSlot;

    @Column(name = "is_theory")
    private boolean isTheory;

    public Schedule() {
    }

    public Schedule(Long id, Class enrolledClass, int dayOfWeek, int startTimeSlot, int endTimeSlot, boolean isTheory) {
        this.id = id;
        this.enrolledClass = enrolledClass;
        this.dayOfWeek = dayOfWeek;
        this.startTimeSlot = startTimeSlot;
        this.endTimeSlot = endTimeSlot;
        this.isTheory = isTheory;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Class getEnrolledClass() {
        return enrolledClass;
    }

    public void setEnrolledClass(Class enrolledClass) {
        this.enrolledClass = enrolledClass;
    }

    public int getDayOfWeek() {
        return dayOfWeek;
    }

    public void setDayOfWeek(int dayOfWeek) {
        this.dayOfWeek = dayOfWeek;
    }

    public int getStartTimeSlot() {
        return startTimeSlot;
    }

    public void setStartTimeSlot(int startTimeSlot) {
        this.startTimeSlot = startTimeSlot;
    }

    public int getEndTimeSlot() {
        return endTimeSlot;
    }

    public void setEndTimeSlot(int endTimeSlot) {
        this.endTimeSlot = endTimeSlot;
    }

    public boolean isTheory() {
        return isTheory;
    }

    public void setTheory(boolean theory) {
        isTheory = theory;
    }
}
