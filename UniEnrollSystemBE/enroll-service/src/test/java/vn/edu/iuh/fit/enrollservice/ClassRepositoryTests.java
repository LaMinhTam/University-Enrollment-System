package vn.edu.iuh.fit.enrollservice;

import org.bson.types.ObjectId;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import vn.edu.iuh.fit.enrollservice.models.Class;
import vn.edu.iuh.fit.enrollservice.models.ClassStatus;
import vn.edu.iuh.fit.enrollservice.repositories.ClassRepository;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Rollback(false)
public class ClassRepositoryTests {
    @Autowired
    private ClassRepository classRepository;

    @Test
    public void createClass(){
        Class savedClass = classRepository.save(new Class(
                "662865e87b28f631d6ad1fbf",
                "4203000664",
                1,
                2021,
                50,
                ClassStatus.WAITING
        ));
        assertThat(savedClass).isNotNull();
    }
}
