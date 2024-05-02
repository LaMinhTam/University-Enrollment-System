package vn.edu.iuh.fit.scheduleservice.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.util.List;

@Document
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClassSchedule {
    @MongoId
    @Field("_id")
    private String classId;
    private String courseId;
    private String courseName;
    @Field("schedules")
    private List<Schedule> schedules;
}