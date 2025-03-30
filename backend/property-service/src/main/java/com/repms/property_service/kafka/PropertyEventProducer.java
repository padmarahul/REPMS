package com.repms.property_service.kafka;

import com.repms.property_service.entities.Property;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class PropertyEventProducer {

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    public void sendPropertyEvent(Property property) {
        JSONObject json = new JSONObject();
        json.put("id", property.getId());
        json.put("name", property.getName());
        json.put("type", property.getType());
        json.put("location", property.getLocation());
        json.put("size", property.getSize());
        json.put("price", property.getPrice());
        json.put("status", property.getStatus());
        json.put("esg_score", property.getEsgScore());
        json.put("created_at", String.valueOf(property.getCreatedAt()));

        kafkaTemplate.send("property-events", json.toString());
    }
}
