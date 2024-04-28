package vn.edu.iuh.fit.scheduleservice;

import org.bson.types.ObjectId;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import vn.edu.iuh.fit.scheduleservice.models.ClassSchedule;
import vn.edu.iuh.fit.scheduleservice.models.ClassType;
import vn.edu.iuh.fit.scheduleservice.models.Schedule;
import vn.edu.iuh.fit.scheduleservice.repositories.ClassScheduleRepository;

import java.util.Date;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Rollback(false)
public class ClassScheduleRepositoryTests {
    @Autowired
    private ClassScheduleRepository classScheduleRepository;

    @Test
    public void createClass() {
        ClassSchedule savedClass = classScheduleRepository.save(new ClassSchedule(
                        "662865e87b28f631d6ad1fbf",
                        "",
                        "",
                        List.of(new Schedule(
                                2,
                                "1-3",
                                new Date(2021, 10, 4),
                                new Date(2021, 10, 25),
                                "A1",
                                "12 Nguyễn Văn Bảo",
                                "Hải",
                                ClassType.THEORY,
                                null,
                                null
                        ))
                )
        );
        assertThat(savedClass).isNotNull();
    }
}
