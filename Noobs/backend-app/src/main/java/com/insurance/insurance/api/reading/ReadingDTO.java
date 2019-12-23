package com.insurance.insurance.api.reading;

import com.insurance.insurance.common.Location;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import java.time.Instant;
import java.util.Set;

@NoArgsConstructor
@AllArgsConstructor
@Getter @Setter
public class ReadingDTO {

    private Set<String> predictionClasses;

    private Location location;

    @NotNull
    private Instant timestamp;

    private Long tripId;
}
