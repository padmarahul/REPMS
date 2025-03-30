package com.repms.analytics_service.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "analytics_properties")
public class AnalyticsProperty {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    private Long propertyId;
    private String type;
    private String location;
    private int size;
    private double price;
    private String status;
    private double esgScore;
    private LocalDateTime createdAt;
    public AnalyticsProperty() {}

    public AnalyticsProperty(Long id, Long propertyId, String type, String location, int size, double price, String status, double esgScore, LocalDateTime createdAt) {
        this.id = id;
        this.propertyId = propertyId;
        this.type = type;
        this.location = location;
        this.size = size;
        this.price = price;
        this.status = status;
        this.esgScore = esgScore;
        this.createdAt = createdAt;
    }

    public Long getPropertyId() {
        return propertyId;
    }

    public void setPropertyId(Long propertyId) {
        this.propertyId = propertyId;
    }

    public int getSize() {
        return size;
    }

    public void setSize(int size) {
        this.size = size;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public double getEsgScore() {
        return esgScore;
    }

    public void setEsgScore(double esgScore) {
        this.esgScore = esgScore;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    @Override
    public String toString() {
        return "AnalyticsProperty{" +
                "id=" + id +
                ", type='" + type + '\'' +
                ", location='" + location + '\'' +
                ", size=" + size +
                ", price=" + price +
                ", status='" + status + '\'' +
                ", esgScore=" + esgScore +
                ", createdAt=" + createdAt +
                '}';
    }

}
