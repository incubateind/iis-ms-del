package com.insurance.insurance.api.userdetails;

import com.insurance.insurance.api.predictionclass.PredictionClassDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter @Setter
public class UserDetailsDTO {

    private Double score;

    private Double distraction;

    private List<PredictionClassDTO> predictionClasses;

    private Long startedTrip;
}
