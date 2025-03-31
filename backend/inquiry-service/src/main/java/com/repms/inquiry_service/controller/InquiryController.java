package com.repms.inquiry_service.controller;


import com.repms.inquiry_service.entities.Inquiry;
import com.repms.inquiry_service.kafka.InquiryEventProducer;
import com.repms.inquiry_service.repository.InquiryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/repms/inquiries")
public class InquiryController {

    @Autowired
    private InquiryRepository repo;
    @Autowired private InquiryEventProducer producer;

    private final WebClient webClient = WebClient.create();
    private final String USER_URL = "http://52.151.249.242:8081/repms/user/getuser/";
    private final String PROPERTY_URL = "http://52.151.249.242:8082/repms/properties/getProperty/";

    @PostMapping("/sendInquiry")
    public ResponseEntity<?> submit(@RequestBody Inquiry inquiry) {
        try {
            webClient.get().uri(PROPERTY_URL + inquiry.getPropertyId())
                    .retrieve().toBodilessEntity().block();
            webClient.get().uri(USER_URL + inquiry.getUserId())
                    .retrieve().toBodilessEntity().block();
        } catch (WebClientResponseException.NotFound e) {
            return ResponseEntity.badRequest().body("Invalid userId or propertyId");
        }

        Inquiry saved = repo.save(inquiry);
        producer.sendInquiryEvent(saved);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("getAllInquiries")
    public ResponseEntity<List<Inquiry>> getAll() {
        try {
            return ResponseEntity.ok(repo.findAll());
        }
        catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("getInquiry/{id}")
    public ResponseEntity<Inquiry> getInquiryById(@PathVariable Long id) {
        try {
            return repo.findById(id)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        }
        catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/deleteInquiry/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        try {
            repo.deleteById(id);
            return ResponseEntity.ok("Inquirys deleted successfully.");
        }
        catch(Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
