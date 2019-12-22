package com.insurance.insurance.domain.predictionclass;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PredictionClassRepository extends JpaRepository<PredictionClass, Long> {
    Optional<PredictionClass> findByName(String name);

}
