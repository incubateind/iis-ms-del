package com.insurance.insurance.api.predictionclass;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;
import java.util.List;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class PredictionClassDTO {
    private String name;

    private String code;

    private List<Instant> timestamps;
}
