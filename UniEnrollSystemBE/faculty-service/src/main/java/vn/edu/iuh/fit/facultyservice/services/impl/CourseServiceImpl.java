package vn.edu.iuh.fit.facultyservice.services.impl;

import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.facultyservice.dtos.CourseDTO;
import vn.edu.iuh.fit.facultyservice.models.MajorCourseYear;
import vn.edu.iuh.fit.facultyservice.repositories.CourseRepository;
import vn.edu.iuh.fit.facultyservice.services.CourseService;

import java.util.List;

@Service
public class CourseServiceImpl implements CourseService {
    private final CourseRepository courseRepository;

    public CourseServiceImpl(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    @Override
    public List<CourseDTO> listAllCourseByMajorAndYear(int majorId, int year) {
        List<MajorCourseYear> majorCourseYears = courseRepository.findAllByMajorAndYear(majorId, year);
        return CourseDTO.convertToDTOList(majorCourseYears);
    }
}
