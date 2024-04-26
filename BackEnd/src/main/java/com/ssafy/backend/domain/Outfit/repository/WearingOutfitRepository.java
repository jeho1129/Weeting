package com.ssafy.backend.domain.Outfit.repository;

import com.ssafy.backend.domain.Outfit.entity.WearingOutfit;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WearingOutfitRepository extends JpaRepository<WearingOutfit, Long> {
    WearingOutfit findByUserID(Long userID);
    void deleteByUserID(Long userID);
}