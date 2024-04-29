package vn.edu.iuh.fit.courseservice.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Field;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Prerequisite implements Serializable {
    private String id;
    private String name;
    private int credit;
    @Field("theory_credit")
    private int theoryCredit;
    @Field("practical_credit")
    private int practicalCredit;
}
