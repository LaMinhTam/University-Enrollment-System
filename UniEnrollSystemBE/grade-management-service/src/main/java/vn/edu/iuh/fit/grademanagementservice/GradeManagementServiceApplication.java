package vn.edu.iuh.fit.grademanagementservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class GradeManagementServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(GradeManagementServiceApplication.class, args);
    }

}
