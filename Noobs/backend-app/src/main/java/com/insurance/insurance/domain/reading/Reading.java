package com.insurance.insurance.domain.reading;

import com.insurance.insurance.domain.predictionclass.PredictionClass;
import com.insurance.insurance.common.Location;
import com.insurance.insurance.domain.trip.Trip;
import com.insurance.insurance.domain.user.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "reading")
@NoArgsConstructor
@Getter @Setter
public class Reading {

    @GeneratedValue
    @Id
    private Long id;

    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

    @OneToMany(cascade = { CascadeType.MERGE , CascadeType.MERGE}, orphanRemoval = true)
    private Set<PredictionClass> predictionClasses = new HashSet<>();

    private Location location;

    private Instant timestamp;

    @ManyToOne
    @JoinColumn(name = "tripId")
    private Trip trip;

    public Reading(User user, Set<PredictionClass> predictionClasses, Location location, Instant timestamp, Trip trip) {
        this.user = user;
        this.predictionClasses = predictionClasses;
        this.location = location;
        this.timestamp = timestamp;
        this.trip = trip;
    }
}
