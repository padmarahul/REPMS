package com.repms.analytics_service.repository;

import com.repms.analytics_service.entities.AnalyticsProperty;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AnalyticsPropertyRepository extends JpaRepository<AnalyticsProperty, Long> {

    @Query("SELECT p.type, COUNT(p) FROM AnalyticsProperty p GROUP BY p.type")
    List<Object[]> countByType();

    @Query("SELECT p.status, COUNT(p) FROM AnalyticsProperty p GROUP BY p.status")
    List<Object[]> countByStatus();

    @Query("SELECT AVG(p.esgScore) FROM AnalyticsProperty p")
    Double avgEsg();

    @Query("SELECT AVG(p.price / p.size) FROM AnalyticsProperty p WHERE p.size > 0")
    Double avgPricePerSqFt();

    @Query("SELECT p.location, COUNT(p) FROM AnalyticsProperty p GROUP BY p.location ORDER BY COUNT(p) DESC")
    List<Object[]> topLocations();
}

