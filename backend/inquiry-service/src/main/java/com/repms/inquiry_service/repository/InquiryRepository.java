package com.repms.inquiry_service.repository;

import com.repms.inquiry_service.entities.Inquiry;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InquiryRepository extends JpaRepository<Inquiry, Long> {
}
