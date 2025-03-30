package com.repms.profile_service.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "saved_properties")
@IdClass(SavedPropertyId.class)
@Getter
@Setter
public class SavedProperty {
    @Id
    private Long userId;

    @Id
    private Long propertyId;

    public SavedProperty() {}

    @Override
    public int hashCode() {
        return super.hashCode();
    }

    @Override
    public boolean equals(Object obj) {
        return super.equals(obj);
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

    public SavedProperty(Long userId, Long propertyId) {
        this.userId = userId;
        this.propertyId = propertyId;
    }

    @Override
    public String toString() {
        return "SavedProperty{" +
                "userId=" + userId +
                ", propertyId=" + propertyId +
                '}';
    }
}
