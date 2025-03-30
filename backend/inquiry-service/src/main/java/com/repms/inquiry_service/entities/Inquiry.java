package com.repms.inquiry_service.entities;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "inquires")
public class Inquiry {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    private Long userId;
    private Long propertyId;
    private String message;

    private LocalDateTime createdAt = LocalDateTime.now();

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

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    @Override
    public String toString() {
        return "Inquiry{" +
                "id=" + id +
                ", userId=" + userId +
                ", propertyId=" + propertyId +
                ", message='" + message + '\'' +
                ", createdAt=" + createdAt +
                '}';
    }

    public Inquiry() {}

    public Inquiry(Long id, Long userId, Long propertyId, String message, LocalDateTime createdAt) {
        this.id = id;
        this.userId = userId;
        this.propertyId = propertyId;
        this.message = message;
        this.createdAt = createdAt;
    }
}
