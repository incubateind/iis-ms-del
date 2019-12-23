package com.insurance.insurance.app.collector;

import com.insurance.insurance.api.reading.ReadingDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/c-api")
public class CollectorController {

    private final CollectorAppService collectorAppService;

    @GetMapping("/user/{userId}/trip")
    public ResponseEntity<?> startNewTrip(@PathVariable Long userId) {
        Long newTripId = collectorAppService.getNewTrip(userId);

        return ResponseEntity.ok(newTripId);
    }

    @PostMapping("/user/{userId}/reading")
    public ResponseEntity<?> addReading(@PathVariable Long userId, @RequestBody ReadingDTO readingDTO) {
        collectorAppService.addReading(userId, readingDTO);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/trip/{tripId}")
    public ResponseEntity<?> endTrip(@PathVariable Long tripId) {
        collectorAppService.endTrip(tripId);
        return ResponseEntity.ok().build();
    }
}
