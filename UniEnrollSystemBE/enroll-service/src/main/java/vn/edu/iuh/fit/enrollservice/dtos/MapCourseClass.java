package vn.edu.iuh.fit.enrollservice.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import vn.edu.iuh.fit.enrollservice.models.Class;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MapCourseClass {
    private Course course;
    private List<Class> classes;

}
