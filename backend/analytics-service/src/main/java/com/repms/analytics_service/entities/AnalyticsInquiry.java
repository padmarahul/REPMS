package com.repms.analytics_service.entities;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "analytics_inquiries")
public class AnalyticsInquiry {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    private Long userId;
    private Long propertyId;
    private LocalDateTime createdAt;
    private String message;

    public AnalyticsInquiry() {}

    public AnalyticsInquiry(Long id, Long userId, Long propertyId, LocalDateTime createdAt, String message) {
        this.id = id;
        this.userId = userId;
        this.propertyId = propertyId;
        this.createdAt = createdAt;
        this.message = message;
    }

    @Override
    public String toString() {
        return "AnalyticsInquiry{" +
                "id=" + id +
                ", userId=" + userId +
                ", propertyId=" + propertyId +
                ", createdAt=" + createdAt +
                ", message='" + message +
                '}';
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getPropertyId() {
        return propertyId;
    }

    public void setPropertyId(Long propertyId) {
        this.propertyId = propertyId;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
