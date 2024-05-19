package vn.edu.iuh.fit.enrollservice.dtos;

import java.io.Serial;
import java.io.Serializable;
import java.util.Map;

public record MapCourseClass(
        Course course,
        Map<String, ClassDTO> classes
) implements Serializable {
    @Serial
    private static final long serialVersionUID = 1524478025872001111L;
}
