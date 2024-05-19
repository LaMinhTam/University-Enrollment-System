package vn.edu.iuh.fit.notificationservice.dtos;

public record CancelRequest(String studentId,
                            String classId,
                            int group) {
}
