package vn.edu.iuh.fit.enrollservice.models;

public enum ClassStatus {
    PLANNING(0), WAITING(1), OPENED(2), CLOSED(3);

    private final int value;

    ClassStatus(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }
}
