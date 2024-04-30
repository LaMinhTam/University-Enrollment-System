package vn.edu.iuh.fit.courseservice.dtos;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ListCourseResponse {
    @Id
    private String id;
    private String name;
    private int credit;
    @Field("theory_credit")
    private int theoryCredit;
    @Field("practical_credit")
    private int practicalCredit;
    private int type;
    private int semester;
    private List<Prerequisite> prerequisites;
}
