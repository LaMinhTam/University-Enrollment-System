package vn.edu.iuh.fit.studentservice.services;

import vn.edu.iuh.fit.studentservice.DTO.StudentDTO;
import vn.edu.iuh.fit.studentservice.models.Student;

public interface StudentService {
    Student save(StudentDTO studentDTO);
}
