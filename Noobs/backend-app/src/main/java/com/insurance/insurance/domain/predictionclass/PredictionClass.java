package com.insurance.insurance.domain.predictionclass;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "predictionClass")
@NoArgsConstructor
@AllArgsConstructor
@Getter @Setter
public class PredictionClass {

    @GeneratedValue
    @Id
    private Long id;

    @Column(unique = true)
    private String code;

    private String name;

    public PredictionClass(String code, String name) {
        this.code = code;
        this.name = name;
    }
}
