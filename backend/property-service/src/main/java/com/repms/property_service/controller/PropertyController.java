package com.repms.property_service.controller;
import com.repms.property_service.entities.Property;
import com.repms.property_service.kafka.PropertyEventProducer;
import com.repms.property_service.repository.PropertyRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/repms/properties")
public class PropertyController {

    @Autowired
    private PropertyRepository repo;

    @Autowired
    private PropertyEventProducer eventProducer;

    @PostMapping("/saveProperty")
    public ResponseEntity<Property> create(@RequestBody Property property) {
        try {
            Property saved = repo.save(property);
            eventProducer.sendPropertyEvent(saved);
            return ResponseEntity.ok(saved);
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @PutMapping("/updateProperty/{id}")
    public ResponseEntity<Property> update(@PathVariable Long id, @RequestBody Property updated) {
        return repo.findById(id).map(existing -> {
            existing.setName(updated.getName());
            existing.setType(updated.getType());
            existing.setLocation(updated.getLocation());
            existing.setSize(updated.getSize());
            existing.setPrice(updated.getPrice());
            existing.setStatus(updated.getStatus());
            existing.setEsgScore(updated.getEsgScore());
            Property saved = repo.save(existing);
            eventProducer.sendPropertyEvent(saved);
            return ResponseEntity.ok(saved);
        }).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/getAllProperties")
    public ResponseEntity<List<Property>> getAll() {
        try {
            List<Property> properties = repo.findAll();
            return ResponseEntity.ok(properties);
        }
       catch (Exception e) {
           return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
       }
    }

    @GetMapping("/getProperty/{id}")
    public ResponseEntity<Property> getById(@PathVariable Long id) {
        return repo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/deleteProperty/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        try {
            repo.deleteById(id);
            return ResponseEntity.ok("Property deleted successfully.");
        }
        catch(Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
