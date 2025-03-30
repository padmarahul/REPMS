package com.repms.analytics_service.kafka;


import com.repms.analytics_service.entities.AnalyticsInquiry;
import com.repms.analytics_service.entities.AnalyticsProperty;
import com.repms.analytics_service.repository.AnalyticsInquiryRepository;
import com.repms.analytics_service.repository.AnalyticsPropertyRepository;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class AnalyticsConsumer {

    @Autowired
    private AnalyticsPropertyRepository propertyRepo;

    @Autowired
    private AnalyticsInquiryRepository inquiryRepo;

    @KafkaListener(topics = "property-events", groupId = "analytics-group")
    public void consumeProperty(String msg) {
        JSONObject json = new JSONObject(msg);
        AnalyticsProperty i = new AnalyticsProperty();
        i.setPropertyId(json.getLong("id"));
        i.setType(json.getString("type"));
        i.setLocation(json.getString("location"));
        i.setSize(json.getInt("size"));
        i.setPrice(json.getDouble("price"));
        i.setStatus(json.getString("status"));
        i.setEsgScore(json.getDouble("esg_score"));
        i.setCreatedAt(LocalDateTime.parse(json.getString("created_at")));
        propertyRepo.save(i);
    }

    @KafkaListener(topics = "inquiry-events", groupId = "analytics-group")
    public void consumeInquiry(String msg) {
        JSONObject json = new JSONObject(msg);
        AnalyticsInquiry i = new AnalyticsInquiry();
        i.setUserId(json.getLong("user_id"));
        i.setPropertyId(json.getLong("property_id"));
        i.setCreatedAt(LocalDateTime.parse(json.getString("created_at")));
        inquiryRepo.save(i);
    }
}
