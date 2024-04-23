package vn.edu.iuh.fit.facultyservice.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import vn.edu.iuh.fit.facultyservice.models.Faculty;
import vn.edu.iuh.fit.facultyservice.services.FacultyService;

import java.util.List;

@RestController
@RequestMapping("/faculties")
public class FacultyController {
    private final FacultyService facultyService;

    public FacultyController(FacultyService facultyService) {
        this.facultyService = facultyService;
    }

    @GetMapping
    public List<Faculty> listAllFaculties() {
        return facultyService.listAllFaculties();
    }
}
