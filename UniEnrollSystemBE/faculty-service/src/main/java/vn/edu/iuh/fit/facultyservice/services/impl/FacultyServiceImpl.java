package vn.edu.iuh.fit.facultyservice.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.facultyservice.models.Faculty;
import vn.edu.iuh.fit.facultyservice.repositories.FacultyRepository;
import vn.edu.iuh.fit.facultyservice.services.FacultyService;

import java.util.List;

@Service
public class FacultyServiceImpl implements FacultyService {
    private final FacultyRepository facultyRepository;

    public FacultyServiceImpl(FacultyRepository facultyRepository) {
        this.facultyRepository = facultyRepository;
    }

    @Override
    public List<Faculty> listAllFaculties() {
        return facultyRepository.findAll();
    }
}
