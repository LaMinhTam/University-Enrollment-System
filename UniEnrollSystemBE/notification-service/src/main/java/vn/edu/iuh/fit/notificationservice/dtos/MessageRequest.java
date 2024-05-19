package vn.edu.iuh.fit.notificationservice.dtos;

import java.io.Serial;
import java.io.Serializable;
import java.util.Map;

public record MessageRequest(EnrollMessageType type, Map<String, Object> request) implements Serializable {
    @Serial
    private static final long serialVersionUID = 7756016052505679966L;

}
