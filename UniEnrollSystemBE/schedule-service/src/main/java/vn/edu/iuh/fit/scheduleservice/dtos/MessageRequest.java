package vn.edu.iuh.fit.scheduleservice.dtos;

import java.io.Serial;
import java.io.Serializable;
import java.util.Map;

public record MessageRequest(EnrollMessageType type, Map<String, Object> request) implements Serializable {
    @Serial
    private static final long serialVersionUID = 1135970247816285944L;

}
