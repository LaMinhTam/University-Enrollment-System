package vn.edu.iuh.fit.enrollservice.services;

import vn.edu.iuh.fit.enrollservice.models.Class;

import java.util.List;

public interface ClassService {
    List<Class> listAllClasses(int semester, int year);
}
