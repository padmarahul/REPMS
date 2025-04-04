package com.repms.analytics_service.repository;

import com.repms.analytics_service.entities.AnalyticsInquiry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;

public interface AnalyticsInquiryRepository extends JpaRepository<AnalyticsInquiry, Long> {

    @Query("SELECT COUNT(i) FROM AnalyticsInquiry i WHERE i.createdAt > :since")
    int countRecent(LocalDateTime since);

    @Query("SELECT COUNT(i) FROM AnalyticsInquiry i WHERE i.createdAt >= :start AND i.createdAt < :end")
    int countInquiriesToday(@Param("start") LocalDateTime start, @Param("end") LocalDateTime end);



}

