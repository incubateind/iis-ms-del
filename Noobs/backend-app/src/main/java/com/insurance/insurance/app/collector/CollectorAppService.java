package com.insurance.insurance.app.collector;

import com.insurance.insurance.domain.predictionclass.PredictionClass;
import com.insurance.insurance.domain.predictionclass.PredictionClassRepository;
import com.insurance.insurance.api.reading.ReadingDTO;
import com.insurance.insurance.domain.reading.Reading;
import com.insurance.insurance.domain.reading.ReadingRepository;
import com.insurance.insurance.domain.trip.Trip;
import com.insurance.insurance.domain.trip.TripRepository;
import com.insurance.insurance.domain.user.User;
import com.insurance.insurance.domain.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.HashSet;
import java.util.NoSuchElementException;
import java.util.Set;
import java.util.stream.Collectors;

import static java.lang.String.format;

@Service
@RequiredArgsConstructor
public class CollectorAppService {

    private final UserRepository userRepository;
    private final TripRepository tripRepository;
    private final PredictionClassRepository predictionClassRepository;
    private final ReadingRepository readingRepository;

    @Transactional
    public Long getNewTrip(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() ->
                new NoSuchElementException(format("User with %s id: not found", userId)));

        Trip newTrip = tripRepository.save(new Trip(user));
        return newTrip.getId();
    }

    @Transactional
    public void endTrip(Long tripId) {
        Trip trip = tripRepository.findById(tripId).orElseThrow(() ->
            new NoSuchElementException(format("Trip id %s: not found", tripId)));

        trip.setEndDate(Instant.now());
    }

    @Transactional
    public void addReading(Long userId, ReadingDTO dto) {
        User user = userRepository.findById(userId).orElseThrow(() ->
                new NoSuchElementException(format("User id %s: not found", userId)));

        Set<PredictionClass> predictionClasses = dto.getPredictionClasses() != null
            ? dto.getPredictionClasses().stream().map(predictionClassCode -> predictionClassRepository
                .findByName(predictionClassCode).<NoSuchElementException>orElseThrow(() ->
                        new NoSuchElementException(format("Prediction class name %s: not found", predictionClassCode))))
                .collect(Collectors.toSet())
                : new HashSet<>();

        Instant truncatedTimestamp = truncateTimestamp(dto.getTimestamp());

        Trip trip = tripRepository.findById(dto.getTripId()).orElseThrow(() ->
                new NoSuchElementException(format("Trip id %s: not found", dto.getTripId())));

        readingRepository.save(new Reading(user, predictionClasses, dto.getLocation(), truncatedTimestamp, trip));
    }

    private Instant truncateTimestamp(Instant timestamp) {
        return timestamp;
    }
}
