package vn.edu.iuh.fit.scheduleservice.messaging;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.scheduleservice.dtos.ChangeRegisterRequest;
import vn.edu.iuh.fit.scheduleservice.dtos.RegisterRequest;
import vn.edu.iuh.fit.scheduleservice.services.ClassScheduleService;

@Service
public class RegisterMessageConsumer {
    private final ClassScheduleService classScheduleService;

    public RegisterMessageConsumer(ClassScheduleService classScheduleService) {
        this.classScheduleService = classScheduleService;
    }

    @RabbitListener(queues = "schedule-enroll-queue")
    public void receiveScheduleRegisterSchedule(RegisterRequest request) {
        classScheduleService.registrySchedule(request.studentId(), request.classId(), request.group());
    }

    @RabbitListener(queues = "schedule-cancel-queue")
    public void receiveScheduleCancelSchedule(RegisterRequest request) {
        classScheduleService.cancelSchedule(request.studentId(), request.classId());
    }

    @RabbitListener(queues = "schedule-change-queue")
    public void receiveScheduleChangeSchedule(ChangeRegisterRequest request) {
        classScheduleService.changeSchedule(request);
    }
}