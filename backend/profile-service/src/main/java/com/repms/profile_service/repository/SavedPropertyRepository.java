package com.repms.profile_service.repository;

import com.repms.profile_service.entities.SavedProperty;
import com.repms.profile_service.entities.SavedPropertyId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SavedPropertyRepository extends JpaRepository<SavedProperty, SavedPropertyId> {
    List<SavedProperty> findByUserId(Long userId);
    void deleteByUserIdAndPropertyId(Long userId, Long propertyId);
}

