package com.repms.analytics_service.controller;

import com.repms.analytics_service.repository.AnalyticsInquiryRepository;
import com.repms.analytics_service.repository.AnalyticsPropertyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.List;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/repms/analytics")
public class AnalyticsController {

    @Autowired
    private AnalyticsPropertyRepository propertyRepo;
    @Autowired private AnalyticsInquiryRepository inquiryRepo;

    @GetMapping("/summary")
    public ResponseEntity<Map<String, Object>> getSummary() {
        Map<String, Object> res = new HashMap<>();

        res.put("totalProperties", propertyRepo.count());
        res.put("propertiesByType", toMap(propertyRepo.countByType()));
        res.put("propertiesByStatus", toMap(propertyRepo.countByStatus()));
        res.put("averageEsgScore", propertyRepo.avgEsg());
        res.put("avgPricePerSqFt", propertyRepo.avgPricePerSqFt());

        List<Map<String, Object>> locations = new ArrayList<>();
        for (Object[] row : propertyRepo.topLocations().stream().limit(5).toList()) {
            Map<String, Object> loc = new HashMap<>();
            loc.put("location", row[0]);
            loc.put("count", row[1]);
            locations.add(loc);
        }
        res.put("topLocations", locations);

        res.put("inquiriesLast0Days", inquiryRepo.countRecent(LocalDateTime.now().minusDays(0)));

        return ResponseEntity.ok(res);
    }

    private Map<String, Integer> toMap(List<Object[]> list) {
        Map<String, Integer> map = new HashMap<>();
        for (Object[] row : list) {
            map.put((String) row[0], ((Number) row[1]).intValue());
        }
        return map;
    }
}
