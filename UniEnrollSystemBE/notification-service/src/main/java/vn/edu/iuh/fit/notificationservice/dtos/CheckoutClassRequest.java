package vn.edu.iuh.fit.notificationservice.dtos;

public record CheckoutClassRequest(String classId, String name) {
    @Override
    public String toString() {
        return classId + "-" + name;
    }
}
