package com.repms.analytics_service.kafka;

import com.repms.analytics_service.entities.AnalyticsProperty;
import com.repms.analytics_service.entities.AnalyticsInquiry;
import com.repms.analytics_service.repository.AnalyticsPropertyRepository;
import com.repms.analytics_service.repository.AnalyticsInquiryRepository;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;

@Service
public class AnalyticsConsumer {

    @Autowired
    private AnalyticsPropertyRepository propertyRepo;

    @Autowired
    private AnalyticsInquiryRepository inquiryRepo;

    // 🔹 Listener for properties
    @KafkaListener(
            topics = "rs.public.properties",
            groupId = "analytics-group",
            concurrency = "3"
    )
    public void consumeProperty(ConsumerRecord<String, String> record) {
        System.out.println(" [PROPERTIES] Partition: " + record.partition() + " | Value: " + record.value());

        try {
            JSONObject event = new JSONObject(record.value());
            JSONObject payload = event.optJSONObject("payload");

            if (payload != null) {
                JSONObject after = payload.optJSONObject("after");

                if (after != null) {
                    System.out.println(" [PROPERTIES] After: " + after);
                    AnalyticsProperty prop = new AnalyticsProperty();
                    prop.setPropertyId(after.getLong("id"));
                    prop.setType(after.getString("type"));
                    prop.setLocation(after.getString("location"));
                    prop.setSize(after.getInt("size"));
                    prop.setPrice(after.getDouble("price"));
                    prop.setStatus(after.getString("status"));
                    prop.setEsgScore(after.getDouble("esg_score"));

                    // Convert timestamp from long to LocalDateTime
                    long timestampMicros = after.getLong("created_at");
                    LocalDateTime createdAt = Instant.ofEpochMilli(timestampMicros / 1000).atZone(ZoneId.systemDefault()).toLocalDateTime();
                    prop.setCreatedAt(createdAt);

                    propertyRepo.save(prop);
                }
            }

        } catch (Exception e) {
            System.err.println(" Error processing property CDC event: " + e.getMessage());
        }
    }

    // 🔹 Listener for inquiries
    @KafkaListener(
            topics = "rs.public.inquires",
            groupId = "analytics-group",
            concurrency = "3" // adjust this to match your inquiry topic partitions
    )
    public void consumeInquiry(ConsumerRecord<String, String> record) {
        System.out.println(" [INQUIRIES] Partition: " + record.partition() + " | Value: " + record.value());

        try {
            JSONObject event = new JSONObject(record.value());
            JSONObject payload = event.optJSONObject("payload");

            if (payload != null) {
                JSONObject after = payload.optJSONObject("after");

                if (after != null) {
                    AnalyticsInquiry inquiry = new AnalyticsInquiry();
                    inquiry.setUserId(after.getLong("user_id"));
                    inquiry.setPropertyId(after.getLong("property_id"));
                    inquiry.setMessage(after.getString("message"));
                    long createdAtMillis = after.getLong("created_at");
                    inquiry.setCreatedAt(Instant.ofEpochMilli(createdAtMillis)
                            .atZone(ZoneId.systemDefault())
                            .toLocalDateTime());
                    inquiryRepo.save(inquiry);
                }
            }

        } catch (Exception e) {
            System.err.println(" Error processing inquiry CDC event: " + e.getMessage());
        }
    }
}
