package vn.edu.iuh.fit.enrollservice.models;

import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.util.Date;

@Document(collection = "enrollment")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Enrollment {
    @MongoId
    private ObjectId id;
    private String studentId;
    private String registryClass;
    private int semester;
    private int year;
    private Date createdAt;

    public Enrollment(String studentId, String registryClass, int semester, int year, Date createdAt) {
        this.studentId = studentId;
        this.registryClass = registryClass;
        this.semester = semester;
        this.year = year;
        this.createdAt = createdAt;
    }
}
