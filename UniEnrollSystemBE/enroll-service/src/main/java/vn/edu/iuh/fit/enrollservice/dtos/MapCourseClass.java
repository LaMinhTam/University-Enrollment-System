package vn.edu.iuh.fit.enrollservice.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import vn.edu.iuh.fit.enrollservice.models.Class;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;

public record MapCourseClass(
        Course course,
        List<ClassDTO> classes
) implements Serializable {
    @Serial
    private static final long serialVersionUID = 1524478025872001111L;
}
