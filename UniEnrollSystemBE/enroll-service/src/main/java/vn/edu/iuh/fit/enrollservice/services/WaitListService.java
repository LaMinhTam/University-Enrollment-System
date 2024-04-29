package vn.edu.iuh.fit.enrollservice.services;

import vn.edu.iuh.fit.enrollservice.models.WaitList;

import java.util.List;

public interface WaitListService {
    List<WaitList> getWaitListClass(String studentId, int semester, int year);

    public WaitList registerWaitList(String studentId, String courseId, int semester, int year);
}
