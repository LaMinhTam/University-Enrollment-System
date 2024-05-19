package vn.edu.iuh.fit.enrollservice.services.impl;

import jakarta.persistence.Tuple;
import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.enrollservice.dtos.ClassDTO;
import vn.edu.iuh.fit.enrollservice.models.Class;
import vn.edu.iuh.fit.enrollservice.repositories.ClassRepository;
import vn.edu.iuh.fit.enrollservice.services.ClassService;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ClassServiceImpl implements ClassService {
    private final ClassRepository classRepository;

    public ClassServiceImpl(ClassRepository classRepository) {
        this.classRepository = classRepository;
    }


    @Override
    public List<ClassDTO> listAllClasses(int semester, int year) {
        List<Tuple> tuples = classRepository.findBySemesterAndYear(semester, year);
        List<ClassDTO> classDTOs = new ArrayList<>();
        for (Tuple tuple : tuples) {
            ClassDTO classDTO = new ClassDTO((Class) tuple.get(0), (Long) tuple.get(1));
            classDTOs.add(classDTO);
        }
        return classDTOs;
    }

    @Override
    public List<Class> getClassesByEnrollment(List<String> classIds) {
        return classRepository.findByIdIn(classIds);
    }

    @Override
    public Map<String, Long> prepareQuantityForSchedule(int semester, int year) {
        List<Tuple> tuples = classRepository.findBySemesterAndYearGroupByClassIdAndGroup(semester, year);
        Map<String, Long> groupQuantityMap = new HashMap<>();
        for (Tuple tuple : tuples) {
            String classId = (String) tuple.get(0);
            Integer group = (Integer) tuple.get(1);
            Long quantity = (Long) tuple.get(2);
            groupQuantityMap.put(classId + "-" + group, quantity);
        }
        return groupQuantityMap;
    }

}
