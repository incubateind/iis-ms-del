package com.insurance.insurance.domain.trip;

import com.insurance.insurance.domain.user.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "trip")
@NoArgsConstructor
@Getter @Setter
public class Trip {

    @GeneratedValue
    @Id
    private Long id;

    private Instant startDate = Instant.now();

    private Instant endDate;

    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

    public Trip(User user) {
        this.user = user;
    }
}
