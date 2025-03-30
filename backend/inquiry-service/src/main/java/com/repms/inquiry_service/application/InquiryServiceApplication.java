package com.repms.inquiry_service.application;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = "com.repms.inquiry_service")
@EntityScan(basePackages = "com.repms.inquiry_service.entities")
@EnableJpaRepositories(basePackages = "com.repms.inquiry_service.repository")
public class InquiryServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(InquiryServiceApplication.class, args);
	}

}
