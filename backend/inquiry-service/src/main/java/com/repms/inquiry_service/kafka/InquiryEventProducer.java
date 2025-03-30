package com.repms.inquiry_service.kafka;

import com.repms.inquiry_service.entities.Inquiry;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class InquiryEventProducer {

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    public void sendInquiryEvent(Inquiry inquiry) {
        JSONObject json = new JSONObject();
        json.put("user_id", inquiry.getUserId());
        json.put("property_id", inquiry.getPropertyId());
        json.put("created_at", inquiry.getCreatedAt().toString());

        kafkaTemplate.send("inquiry-events", json.toString());
    }
}

