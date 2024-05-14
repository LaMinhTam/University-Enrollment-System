package vn.edu.iuh.fit.enrollservice.dtos;

import java.io.Serial;
import java.io.Serializable;

public record MessageRequest(EnrollMessageType type, Object request) implements Serializable {
    @Serial
    private static final long serialVersionUID = -8104061162105084737L;

}
