package vn.edu.iuh.fit.studentservice.mappers;

import vn.edu.iuh.fit.studentservice.DTO.StudentDTO;
import vn.edu.iuh.fit.studentservice.models.Student;

public class StudentToDTO {
    public static StudentDTO toDTO(Student student){
        return new StudentDTO(student.getId(), student.getFullName(), student.getPassword(), student.getPhotos(), student.getRoles().stream().findFirst().get().getName());
    }
}
