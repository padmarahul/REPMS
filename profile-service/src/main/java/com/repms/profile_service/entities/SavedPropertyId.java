package com.repms.profile_service.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;



@Getter
@Setter
public class SavedPropertyId implements Serializable {
    private Long userId;
    private Long propertyId;

    public SavedPropertyId() {}

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

    public SavedPropertyId(Long userId, Long propertyId) {
        this.userId = userId;
        this.propertyId = propertyId;
    }

    @Override
    public int hashCode() {
        return super.hashCode();
    }

    @Override
    public boolean equals(Object obj) {
        return super.equals(obj);
    }

    @Override
    public String toString() {
        return "SavedPropertyId{" +
                "userId=" + userId +
                ", propertyId=" + propertyId +
                '}';
    }
}
