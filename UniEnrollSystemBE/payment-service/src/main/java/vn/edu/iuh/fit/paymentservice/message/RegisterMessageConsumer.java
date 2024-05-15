package vn.edu.iuh.fit.paymentservice.message;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.paymentservice.dtos.CancelRequest;
import vn.edu.iuh.fit.paymentservice.dtos.ChangeRegisterRequest;
import vn.edu.iuh.fit.paymentservice.dtos.MessageRequest;
import vn.edu.iuh.fit.paymentservice.dtos.RegisterRequest;
import vn.edu.iuh.fit.paymentservice.services.CoursePaymentService;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class RegisterMessageConsumer {
    private final CoursePaymentService coursePaymentService;
    @Value("${prices}")
    private List<String> prices;

    public RegisterMessageConsumer(CoursePaymentService coursePaymentService) {
        this.coursePaymentService = coursePaymentService;
    }

    private void calculateFee(RegisterRequest registerRequest) {
        Map<String, int[]> pricesSemester = prices.stream().collect(Collectors.toMap(
                price -> price.split("-")[0],
                price -> {
                    String[] split = price.split("-")[1].split("_");
                    return new int[]{Integer.parseInt(split[0]), Integer.parseInt(split[1])};
                }
        ));
        int[] creditPrices = pricesSemester.get(registerRequest.getSemester() + "_" + registerRequest.getYear());
        registerRequest.setAmount(Double.valueOf(registerRequest.getTheoryCredit() * creditPrices[0] + registerRequest.getPracticalCredit() * creditPrices[1]));
    }


    @RabbitListener(queues = "payment-queue")
    public void receivePaymentRegisterSchedule(MessageRequest request) {
        switch (request.type()) {
            case REGISTER -> {
                RegisterRequest registerRequest = new RegisterRequest(
                        (String) request.request().get("studentId"),
                        (String) request.request().get("classId"),
                        (String) request.request().get("courseId"),
                        (String) request.request().get("courseName"),
                        (int) request.request().get("year"),
                        (int) request.request().get("semester"),
                        0.0,
                        (int) request.request().get("credit"),
                        (int) request.request().get("theoryCredit"),
                        (int) request.request().get("practicalCredit")
                );
                calculateFee(registerRequest);
                coursePaymentService.register(registerRequest);
            }
            case CANCEL -> {
                CancelRequest cancelRequest = new CancelRequest(
                        (String) request.request().get("studentId"),
                        (String) request.request().get("classId"),
                        (int) request.request().get("group")
                );
                coursePaymentService.cancelRegister(cancelRequest.studentId(), cancelRequest.classId());
            }
            case CHANGE -> {
                ChangeRegisterRequest changeRegisterRequest = new ChangeRegisterRequest(
                        (String) request.request().get("studentId"),
                        (String) request.request().get("oldClassId"),
                        (String) request.request().get("newClassId")
                );
                coursePaymentService.changeSchedule(changeRegisterRequest.studentId(), changeRegisterRequest.newClassId(), changeRegisterRequest.oldClassId());
            }
        }
    }
}