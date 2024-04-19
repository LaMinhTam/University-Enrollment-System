package vn.edu.iuh.fit.unienrollsystem.entity.enroll;

import jakarta.persistence.*;
import vn.edu.iuh.fit.unienrollsystem.entity.department.Major;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "course")
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "credit")
    private int credit;

    @Column(name = "theory_credit")
    private int theoryCredit;

    @Column(name = "practical_credit")
    private int practicalCredit;
    @ManyToMany
    @JoinTable(
            name = "major_course",
            joinColumns = @JoinColumn(name = "course_id"),
            inverseJoinColumns = @JoinColumn(name = "major_id")
    )
    private Set<Major> majors = new HashSet<>();

    public Course() {
    }

    public Course(Long id, String name, int credit, int theoryCredit, int practicalCredit, Set<Major> majors) {
        this.id = id;
        this.name = name;
        this.credit = credit;
        this.theoryCredit = theoryCredit;
        this.practicalCredit = practicalCredit;
        this.majors = majors;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getCredit() {
        return credit;
    }

    public void setCredit(int credit) {
        this.credit = credit;
    }

    public int getTheoryCredit() {
        return theoryCredit;
    }

    public void setTheoryCredit(int theoryCredit) {
        this.theoryCredit = theoryCredit;
    }

    public int getPracticalCredit() {
        return practicalCredit;
    }

    public void setPracticalCredit(int practicalCredit) {
        this.practicalCredit = practicalCredit;
    }

    public Set<Major> getMajors() {
        return majors;
    }

    public void setMajors(Set<Major> majors) {
        this.majors = majors;
    }
}