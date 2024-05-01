package vn.edu.iuh.fit.scheduleservice.messaging;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.scheduleservice.dtos.ChangeScheduleRequest;
import vn.edu.iuh.fit.scheduleservice.dtos.RegisterSchedule;
import vn.edu.iuh.fit.scheduleservice.services.ClassScheduleService;

@Service
public class RegisterMessageConsumer {
    private final ClassScheduleService classScheduleService;

    public RegisterMessageConsumer(ClassScheduleService classScheduleService) {
        this.classScheduleService = classScheduleService;
    }

    @RabbitListener(queues = "enroll-queue")
    public void receiveRegisterSchedule(RegisterSchedule schedule) {
        classScheduleService.registrySchedule(schedule.studentId(), schedule.classId());
    }

    @RabbitListener(queues = "cancel-queue")
    public void receiveCancelSchedule(RegisterSchedule schedule) {
        classScheduleService.cancelSchedule(schedule.studentId(), schedule.classId());
    }

    @RabbitListener(queues = "change-queue")
    public void receiveChangeSchedule(ChangeScheduleRequest schedule) {
        classScheduleService.changeSchedule(schedule);
    }
}
