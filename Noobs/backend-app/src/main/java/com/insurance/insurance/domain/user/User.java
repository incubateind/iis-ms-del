package com.insurance.insurance.domain.user;

import com.insurance.insurance.domain.predictionclass.PredictionClass;
import com.insurance.insurance.domain.reading.Reading;
import com.insurance.insurance.domain.trip.Trip;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.Instant;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static java.util.stream.Collectors.toList;
import static javax.persistence.CascadeType.MERGE;
import static javax.persistence.CascadeType.PERSIST;

@Entity
@Table(name = "user")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class User {

    @GeneratedValue
    @Id
    private Long id;

    private String username;

    @OneToMany(mappedBy = "user", cascade = {MERGE, PERSIST}, orphanRemoval = true)
    private Set<Trip> trips = new HashSet<>();

    @OneToMany(mappedBy = "user", cascade = {MERGE, PERSIST}, orphanRemoval = true)
    private List<Reading> readings = new ArrayList<>();


    public List<Instant> getTimestampsForClass(PredictionClass predictionClass) {
        return this.getReadings().stream()
            .filter(reading -> reading.getPredictionClasses().contains(predictionClass))
            .map(Reading::getTimestamp)
            .collect(toList());
    }

    public void removeTrip(Trip trip) {
        this.trips.remove(trip);
    }
}
