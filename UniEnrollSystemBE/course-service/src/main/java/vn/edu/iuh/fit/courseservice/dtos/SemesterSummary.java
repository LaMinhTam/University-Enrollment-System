package vn.edu.iuh.fit.courseservice.dtos;

import java.util.List;

public record SemesterSummary(
        int mandatoryCredits,
        int electiveCredits,
        List<CourseDTO> coursesMandatory,
        List<CourseDTO> coursesElective) {


}
