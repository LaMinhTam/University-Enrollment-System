package vn.edu.iuh.fit.paymentservice.controllers;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.iuh.fit.paymentservice.dtos.PaymentRequest;
import vn.edu.iuh.fit.paymentservice.dtos.ResponseWrapper;
import vn.edu.iuh.fit.paymentservice.message.CheckoutMessageProducer;
import vn.edu.iuh.fit.paymentservice.models.CoursePayment;
import vn.edu.iuh.fit.paymentservice.models.Invoice;
import vn.edu.iuh.fit.paymentservice.models.PaymentStatus;
import vn.edu.iuh.fit.paymentservice.services.CoursePaymentService;
import vn.edu.iuh.fit.paymentservice.services.InvoiceService;
import vn.edu.iuh.fit.paymentservice.vnpay.VNPayConfig;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.*;

@RestController
@RequestMapping("/payments")
public class PaymentController {
    private final InvoiceService invoiceService;
    private final CoursePaymentService coursePaymentService;
    private final CheckoutMessageProducer checkoutMessageProducer;
    private final VNPayConfig vnPayConfig;

    public PaymentController(InvoiceService invoiceService, CoursePaymentService coursePaymentService, CheckoutMessageProducer checkoutMessageProducer, VNPayConfig vnPayConfig) {
        this.invoiceService = invoiceService;
        this.coursePaymentService = coursePaymentService;
        this.checkoutMessageProducer = checkoutMessageProducer;
        this.vnPayConfig = vnPayConfig;
    }

    @PostMapping("/create_payment")
    public ResponseEntity<?> createPayment(HttpServletRequest req, @RequestHeader("id") String studentId, @RequestBody PaymentRequest request) throws UnsupportedEncodingException {
        List<CoursePayment> coursePayments = coursePaymentService.getCoursePaymentsById(studentId, request.class_ids());
        List<String> classIds = coursePayments.stream().map(CoursePayment::getClassId).toList();
        List<String> missingClassId = new ArrayList<>();
        request.class_ids().forEach(classId -> {
            if (!classIds.contains(classId)) {
                missingClassId.add(classId);
            }
        });
        if (!missingClassId.isEmpty()) {
            return ResponseEntity.badRequest().body("Các lớp học không tồn tại: " + missingClassId);
        }

        CoursePayment coursePayment = coursePayments.get(0);
        String invoiceId = coursePayment.getSemester() + "" + coursePayment.getYear() + VNPayConfig.getRandomNumber(8) + "1";

        String orderType = "other";
        long amount = request.amount() * 100;

        String vnp_TxnRef = invoiceId;
        String vnp_IpAddr = VNPayConfig.getIpAddress(req);

        String vnp_TmnCode = vnPayConfig.getVnp_TmnCode();

        Map<String, String> vnp_Params = new HashMap<>();
        vnp_Params.put("vnp_Version", vnPayConfig.getVnp_Version());
        vnp_Params.put("vnp_Command", vnPayConfig.getVnp_Command());
        vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
        vnp_Params.put("vnp_Amount", String.valueOf(amount));
        vnp_Params.put("vnp_CurrCode", "VND");

//        if (bankCode != null && !bankCode.isEmpty()) {
//            vnp_Params.put("vnp_BankCode", bankCode);
//        }
        vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
        vnp_Params.put("vnp_OrderInfo", "Thanh toan don hang:" + vnp_TxnRef);
        vnp_Params.put("vnp_OrderType", orderType);

        String locate = req.getParameter("language");
        if (locate != null && !locate.isEmpty()) {
            vnp_Params.put("vnp_Locale", locate);
        } else {
            vnp_Params.put("vnp_Locale", "vn");
        }
        vnp_Params.put("vnp_ReturnUrl", vnPayConfig.getVnp_ReturnUrl());
        vnp_Params.put("vnp_IpAddr", vnp_IpAddr);

        Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        String vnp_CreateDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_CreateDate", vnp_CreateDate);

        cld.add(Calendar.MINUTE, 15);
        String vnp_ExpireDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);

        List fieldNames = new ArrayList(vnp_Params.keySet());
        Collections.sort(fieldNames);
        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();
        Iterator itr = fieldNames.iterator();
        while (itr.hasNext()) {
            String fieldName = (String) itr.next();
            String fieldValue = (String) vnp_Params.get(fieldName);
            if ((fieldValue != null) && (fieldValue.length() > 0)) {
                //Build hash data
                hashData.append(fieldName);
                hashData.append('=');
                hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                //Build query
                query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII.toString()));
                query.append('=');
                query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                if (itr.hasNext()) {
                    query.append('&');
                    hashData.append('&');
                }
            }
        }
        String queryUrl = query.toString();
        String vnp_SecureHash = VNPayConfig.hmacSHA512(vnPayConfig.getSecretKey(), hashData.toString());
        queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;
        String paymentUrl = vnPayConfig.getVnp_PayUrl() + "?" + queryUrl;
//        com.google.gson.JsonObject job = new JsonObject();
//        job.addProperty("code", "00");
//        job.addProperty("message", "success");
//        job.addProperty("data", paymentUrl);
//        Gson gson = new Gson();
//        resp.getWriter().write(gson.toJson(job));
        invoiceService.createInvoice(invoiceId, studentId, "VNPAY", Double.valueOf(request.amount()), coursePayments);
        return ResponseEntity.ok(new ResponseWrapper("Đường dẫn VNPAY", paymentUrl, 200));
    }


    @PostMapping("/payment_callback")
    public ResponseEntity<?> paymentCallback(HttpServletRequest req, @RequestHeader("id") String studentId) {
        Map<String, String> fields = new HashMap<>();
        Map<String, String[]> parameterMap = req.getParameterMap();
        for (String key : parameterMap.keySet()) {
            String[] values = parameterMap.get(key);
            try {
                String encodedKey = URLEncoder.encode(key, StandardCharsets.US_ASCII.toString());
                String encodedValue = URLEncoder.encode(values[0], StandardCharsets.US_ASCII.toString());
                fields.put(encodedKey, encodedValue);
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }
        }

        String invoiceId = fields.get("vnp_TxnRef");

        if (invoiceService.getInvoicesById(invoiceId).getStatus() == PaymentStatus.PAID) {
            return ResponseEntity.badRequest().body("Giao dịch đã được xử lý");
        }

        String vnp_SecureHash = req.getParameter("vnp_SecureHash");
        fields.remove("vnp_SecureHash");
        String signValue = vnPayConfig.hashAllFields(fields);
        if (vnp_SecureHash.equals(signValue)) {
            String vnp_ResponseCode = req.getParameter("vnp_ResponseCode");
            if ("00".equals(vnp_ResponseCode)) {
                //Thanh toan thanh cong
                //Cap nhat trang thai don hang trong csdl
                Invoice invoice = invoiceService.updatePaymentStatus(invoiceId, PaymentStatus.PAID);
                List<String> classIds = invoice.getCoursePayments().stream().map(CoursePayment::getClassId).toList();
                coursePaymentService.updatePaymentStatus(studentId, classIds, PaymentStatus.PAID);
                checkoutMessageProducer.sendCheckoutMessage(studentId, invoiceId, PaymentStatus.PAID);
                return ResponseEntity.ok(new ResponseWrapper("Giao dịch thành công", null, 200));
            } else {
                //Thanh toan khong thanh cong. Ma loi: vnp_ResponseCode
                invoiceService.updatePaymentStatus(invoiceId, PaymentStatus.ERROR);
                return ResponseEntity.ok(new ResponseWrapper("Giao dịch thất bại. Mã lỗi: " + vnp_ResponseCode, null, HttpStatus.BAD_REQUEST.value()));
            }
        } else {
            return ResponseEntity.ok(new ResponseWrapper("Giao dịch không hợp lệ", null, HttpStatus.FORBIDDEN.value()));
        }
    }
}
