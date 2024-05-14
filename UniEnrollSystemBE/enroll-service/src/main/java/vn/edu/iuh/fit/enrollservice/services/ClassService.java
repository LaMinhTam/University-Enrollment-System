package vn.edu.iuh.fit.enrollservice.services;

import vn.edu.iuh.fit.enrollservice.dtos.ClassDTO;
import vn.edu.iuh.fit.enrollservice.models.Class;

import java.util.List;
import java.util.Map;

public interface ClassService {
    List<ClassDTO> listAllClasses(int semester, int year);

    List<Class> getClassesByEnrollment(List<String> registerClasses);

    Map<String, Long> prepareQuantityForSchedule(int semester, int year);
}
