package vn.edu.iuh.fit.enrollservice.services.impl;

import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.enrollservice.models.WaitList;
import vn.edu.iuh.fit.enrollservice.repositories.WaitListRepository;
import vn.edu.iuh.fit.enrollservice.services.WaitListService;

import java.util.Date;
import java.util.List;

@Service
public class WaitListServiceImpl implements WaitListService {
    private final WaitListRepository waitListRepository;

    public WaitListServiceImpl(WaitListRepository waitListRepository) {
        this.waitListRepository = waitListRepository;
    }

    @Override
    public List<WaitList> getWaitListClass(String studentId, int semester, int year) {
        return waitListRepository.findByStudentIdAndSemesterAndYear(studentId, semester, year);
    }

    @Override
    public WaitList registerWaitList(String studentId, String courseId, int semester, int year) {
        return waitListRepository.save(new WaitList(studentId, courseId, semester, year, new Date()));
    }
}
