package vn.edu.iuh.fit.unienrollsystem.entity.enroll;

import jakarta.persistence.*;

@Entity
@Table(name = "grade")
public class Grade {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "enrollment_id")
    private Enrollment enrollment;

    @Column(name = "theory_score_period1")
    private float theoryScorePeriod1;

    @Column(name = "theory_score_period2")
    private float theoryScorePeriod2;

    @Column(name = "theory_score_period3")
    private float theoryScorePeriod3;

    @Column(name = "practical_score_period1")
    private float practicalScorePeriod1;

    @Column(name = "practical_score_period2")
    private float practicalScorePeriod2;

    @Column(name = "practical_score_period3")
    private float practicalScorePeriod3;

    @Column(name = "midterm_score")
    private float midtermScore;

    @Column(name = "final_score")
    private float finalScore;

    @Column(name = "overall_score")
    private float overallScore;

    public Grade() {
    }

    public Grade(Long id, Enrollment enrollment, float theoryScorePeriod1, float theoryScorePeriod2, float theoryScorePeriod3, float practicalScorePeriod1, float practicalScorePeriod2, float practicalScorePeriod3, float midtermScore, float finalScore, float overallScore) {
        this.id = id;
        this.enrollment = enrollment;
        this.theoryScorePeriod1 = theoryScorePeriod1;
        this.theoryScorePeriod2 = theoryScorePeriod2;
        this.theoryScorePeriod3 = theoryScorePeriod3;
        this.practicalScorePeriod1 = practicalScorePeriod1;
        this.practicalScorePeriod2 = practicalScorePeriod2;
        this.practicalScorePeriod3 = practicalScorePeriod3;
        this.midtermScore = midtermScore;
        this.finalScore = finalScore;
        this.overallScore = overallScore;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Enrollment getEnrollment() {
        return enrollment;
    }

    public void setEnrollment(Enrollment enrollment) {
        this.enrollment = enrollment;
    }

    public float getTheoryScorePeriod1() {
        return theoryScorePeriod1;
    }

    public void setTheoryScorePeriod1(float theoryScorePeriod1) {
        this.theoryScorePeriod1 = theoryScorePeriod1;
    }

    public float getTheoryScorePeriod2() {
        return theoryScorePeriod2;
    }

    public void setTheoryScorePeriod2(float theoryScorePeriod2) {
        this.theoryScorePeriod2 = theoryScorePeriod2;
    }

    public float getTheoryScorePeriod3() {
        return theoryScorePeriod3;
    }

    public void setTheoryScorePeriod3(float theoryScorePeriod3) {
        this.theoryScorePeriod3 = theoryScorePeriod3;
    }

    public float getPracticalScorePeriod1() {
        return practicalScorePeriod1;
    }

    public void setPracticalScorePeriod1(float practicalScorePeriod1) {
        this.practicalScorePeriod1 = practicalScorePeriod1;
    }

    public float getPracticalScorePeriod2() {
        return practicalScorePeriod2;
    }

    public void setPracticalScorePeriod2(float practicalScorePeriod2) {
        this.practicalScorePeriod2 = practicalScorePeriod2;
    }

    public float getPracticalScorePeriod3() {
        return practicalScorePeriod3;
    }

    public void setPracticalScorePeriod3(float practicalScorePeriod3) {
        this.practicalScorePeriod3 = practicalScorePeriod3;
    }

    public float getMidtermScore() {
        return midtermScore;
    }

    public void setMidtermScore(float midtermScore) {
        this.midtermScore = midtermScore;
    }

    public float getFinalScore() {
        return finalScore;
    }

    public void setFinalScore(float finalScore) {
        this.finalScore = finalScore;
    }

    public float getOverallScore() {
        return overallScore;
    }

    public void setOverallScore(float overallScore) {
        this.overallScore = overallScore;
    }
}
