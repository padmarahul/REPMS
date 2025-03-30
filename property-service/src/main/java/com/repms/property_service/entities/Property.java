package com.repms.property_service.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;


@Getter
@Setter
@Entity
@Table(name = "properties")
public class Property {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    private String name;

    @Enumerated(EnumType.STRING)
    private PropertyType type;

    private String location;
    private int size;
    private double price;
    private String status;
    private double esgScore;
    private LocalDateTime createdAt = LocalDateTime.now();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public PropertyType getType() {
        return type;
    }

    public void setType(PropertyType type) {
        this.type = type;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public int getSize() {
        return size;
    }

    public void setSize(int size) {
        this.size = size;
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

    public Property() {}


    public Property(Long id, String name, PropertyType type, String location, int size, double price, String status, double esgScore, LocalDateTime createdAt) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.location = location;
        this.size = size;
        this.price = price;
        this.status = status;
        this.esgScore = esgScore;
        this.createdAt = createdAt;
    }

    @Override
    public String toString() {
        return "Property{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", type=" + type +
                ", location='" + location + '\'' +
                ", size=" + size +
                ", price=" + price +
                ", status='" + status + '\'' +
                ", esgScore=" + esgScore +
                ", createdAt=" + createdAt +
                '}';
    }
}
