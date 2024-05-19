package vn.edu.iuh.fit.grademanagementservice.dtos;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

public record MajorSemesterSummary(
        int year,
        int semester,
        int majorId,
        int totalMandatoryCredits,
        int totalElectiveCredits) {

}