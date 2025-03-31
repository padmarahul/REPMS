package com.repms.profile_service.controller;

import com.repms.profile_service.entities.SavedProperty;
import com.repms.profile_service.repository.SavedPropertyRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/repms/customers")
public class SavedPropertyController {

    @Autowired
    private SavedPropertyRepository repo;

    private final WebClient webClient = WebClient.create();
    private final String USER_URL = "http://52.151.249.242:8081/repms/user/getuser/";
    private final String PROPERTY_URL = "http://52.151.249.242:8082/repms/properties/getProperty/";

    @PostMapping("/save/{propertyId}")
    public ResponseEntity<String> save(@RequestParam Long userId, @PathVariable Long propertyId) {
        try {
            if (!isValidUser(userId) || !isValidProperty(propertyId)) {
                return ResponseEntity.badRequest().body("Invalid userId or propertyId");
            }
            SavedProperty sp = new SavedProperty(userId, propertyId);
            repo.save(sp);
            return ResponseEntity.ok("Property got saved successfully.");
        }
        catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/getallsavedproperties")
    public ResponseEntity<List<Object>> getSavedProperties(@RequestParam Long userId) {
        List<SavedProperty> saved = repo.findByUserId(userId);
        List<Object> properties = new ArrayList<>();

        for (SavedProperty sp : saved) {
            try {
                Object prop = webClient.get()
                        .uri("http://localhost:8082/repms/properties/getProperty/" + sp.getPropertyId())
                        .retrieve()
                        .bodyToMono(Object.class)
                        .block();
                properties.add(prop);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return ResponseEntity.ok(properties);
    }


    @Transactional
    @DeleteMapping("/removeproperty/{propertyId}")
    public ResponseEntity<String> removeproperty(@RequestParam Long userId, @PathVariable Long propertyId) {
        try {
            repo.deleteByUserIdAndPropertyId(userId, propertyId);
            return ResponseEntity.ok("Property got removed.");
        }
        catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    private boolean isValidUser(Long userId) {
        try {
            webClient.get().uri(USER_URL + userId).retrieve().toBodilessEntity().block();
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    private boolean isValidProperty(Long propertyId) {
        try {
            webClient.get().uri(PROPERTY_URL + propertyId).retrieve().toBodilessEntity().block();
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}

