package vn.edu.iuh.fit.facultyservice.services;

import vn.edu.iuh.fit.facultyservice.models.MajorSemesterSummary;

import java.util.List;

public interface MajorSemesterSummaryService {
    public List<MajorSemesterSummary> findAllByMajorIdAndYear(int majorId, int year);
}
