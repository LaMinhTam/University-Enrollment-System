package vn.edu.iuh.fit.enrollservice.dtos;

public record CancelRequest(String studentId,
                            String classId,
                            int group) {
}
