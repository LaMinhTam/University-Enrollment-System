package vn.edu.iuh.fit.enrollservice.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.enrollservice.models.Class;
import vn.edu.iuh.fit.enrollservice.repositories.ClassRepository;
import vn.edu.iuh.fit.enrollservice.services.ClassService;

import java.util.List;

@Service
public class ClassServiceImpl implements ClassService {
    private final ClassRepository classRepository;

    public ClassServiceImpl(ClassRepository classRepository) {
        this.classRepository = classRepository;
    }


    @Override
    public List<Class> listAllClasses(int semester, int year) {
        return classRepository.findBySemesterAndYear(semester, year);
    }
}
