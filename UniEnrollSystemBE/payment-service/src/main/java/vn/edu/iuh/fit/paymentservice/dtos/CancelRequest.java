package vn.edu.iuh.fit.paymentservice.dtos;

public record CancelRequest(String studentId,
                            String classId,
                            int group) {
}
