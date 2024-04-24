package vn.edu.iuh.fit.enrollservice.dtos;

public enum ClassType {
    THEORY(0), PRACTICE(1);
    private final int value;

    ClassType(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }
}