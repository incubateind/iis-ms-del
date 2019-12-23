package com.insurance.insurance.app.userdetails;

import com.insurance.insurance.api.predictionclass.PredictionClassDTO;
import com.insurance.insurance.api.userdetails.UserDetailsDTO;
import com.insurance.insurance.domain.predictionclass.PredictionClass;
import com.insurance.insurance.domain.predictionclass.PredictionClassRepository;
import com.insurance.insurance.domain.user.User;
import com.insurance.insurance.domain.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.Instant;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static java.lang.String.format;
import static java.util.stream.Collectors.toList;

@Service
@RequiredArgsConstructor
public class UserDetailsAppService {

    private final UserRepository userRepository;
    private final PredictionClassRepository predictionClassRepository;

    @Transactional
    public UserDetailsDTO getUserDetails(Long userId, Instant from, Instant to) {
        User user = userRepository.findById(userId).orElseThrow(() ->
            new NoSuchElementException(format("User with %s id: not found", userId)));

        Double score = 0.7D;

        Double distraction = 0.25D;

        List<PredictionClassDTO> predictionClasses = predictionClassRepository.findAll().stream()
            .map(predictionClass -> {
                List<Instant> timestamps = user.getTimestampsForClass(predictionClass).stream()
                    .filter(timestamp -> isBetween(timestamp, from, to)).collect(toList());

                return new PredictionClassDTO(predictionClass.getCode(), predictionClass.getName(), timestamps);
            })
            .collect(toList());

        long startedTrips = user.getTrips().stream().filter(trip -> isBetween(trip.getStartDate(), from, to)).count();

        return new UserDetailsDTO(score, distraction, predictionClasses, startedTrips);
    }

    private boolean isBetween(Instant timestamp, Instant from, Instant to) {
        if (timestamp == null) {
            throw new RuntimeException("Timestamp cannot be null");
        }
        if (from != null && timestamp.compareTo(from) < 0) {
            return false;
        }
        if (to != null && timestamp.compareTo(to) > 0) {
            return false;
        }
        return true;
    }
}