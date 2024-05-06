package vn.edu.iuh.fit.grademanagementservice.dtos;

import java.util.List;

public record StatisticResponse(List<String> subjects,
                                List<Float> averages,
                                List<Float> grades) {


}
