package vn.edu.iuh.fit.enrollservice.models;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.MongoId;

@Document(collection = "class")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Class {
    @MongoId
    private String id;
    private String course;
    private int semester;
    private int year;
    @Field("max_capacity")
    private int maxCapacity;
    @Enumerated(EnumType.ORDINAL)
    private ClassStatus status;
}
