package vn.edu.iuh.fit.enrollservice.utils;

import vn.edu.iuh.fit.enrollservice.dtos.Course;
import vn.edu.iuh.fit.enrollservice.models.Class;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class FeeCalcHelper {
    public static Double calculateFee(Course course, List<String> prices, int year, int semester) {
        Map<String, int[]> pricesSemester = prices.stream().collect(Collectors.toMap(
                price -> price.split("-")[0],
                price -> {
                    String[] split = price.split("-")[1].split("_");
                    return new int[]{Integer.parseInt(split[0]), Integer.parseInt(split[1])};
                }
        ));
        int[] creditPrices = pricesSemester.get(semester + "_" + year);
        return (double) (course.getTheoryCredit() * creditPrices[0] + course.getPracticalCredit() * creditPrices[1]);
    }
}
