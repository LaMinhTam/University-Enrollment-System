package vn.edu.iuh.fit.scheduleservice.messaging;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.scheduleservice.dtos.ChangeRegisterRequest;
import vn.edu.iuh.fit.scheduleservice.dtos.MessageRequest;
import vn.edu.iuh.fit.scheduleservice.dtos.RegisterRequest;
import vn.edu.iuh.fit.scheduleservice.services.ClassScheduleService;

@Service
public class RegisterMessageConsumer {
    private final ClassScheduleService classScheduleService;

    public RegisterMessageConsumer(ClassScheduleService classScheduleService) {
        this.classScheduleService = classScheduleService;
    }

    @RabbitListener(queues = "schedule-queue")
    public void receiveScheduleRegisterSchedule(MessageRequest request) {
        switch (request.type()) {
            case REGISTER -> {
                RegisterRequest registerRequest = new RegisterRequest(
                        (String) request.request().get("studentId"),
                        (String) request.request().get("classId"),
                        (int) request.request().get("group")
                );
                classScheduleService.registrySchedule(registerRequest.studentId(), registerRequest.classId(), registerRequest.group());
            }
            case CANCEL -> {
                RegisterRequest registerRequest = new RegisterRequest(
                        (String) request.request().get("studentId"),
                        (String) request.request().get("classId"),
                        (int) request.request().get("group")
                );
                classScheduleService.cancelSchedule(registerRequest.studentId(), registerRequest.classId());
            }
            case CHANGE -> {
                ChangeRegisterRequest changeRegisterRequest = new ChangeRegisterRequest(
                        (String) request.request().get("studentId"),
                        (String) request.request().get("oldClassId"),
                        (String) request.request().get("newClassId")
                );
                classScheduleService.changeSchedule(changeRegisterRequest.newClassId(), changeRegisterRequest.oldClassId(), changeRegisterRequest.studentId());
            }
        }
    }
}