package vn.edu.iuh.fit.facultyservice.dtos;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Data;
import vn.edu.iuh.fit.facultyservice.models.Course;
import vn.edu.iuh.fit.facultyservice.models.CourseType;
import vn.edu.iuh.fit.facultyservice.models.MajorCourseYear;

import java.util.List;
import java.util.stream.Collectors;

@Data
public class CourseDTO {
    private Course course;
    private int semester;
    private int courseType;

    public CourseDTO(MajorCourseYear majorCourseYear) {
        this.course = majorCourseYear.getCourse();
        this.semester = majorCourseYear.getAcademicYear();
        this.courseType = majorCourseYear.getType().ordinal();
    }

    public static List<CourseDTO> convertToDTOList(List<MajorCourseYear> majorCourseYears) {
        return majorCourseYears.stream()
                .map(CourseDTO::new)
                .collect(Collectors.toList());
    }
}
