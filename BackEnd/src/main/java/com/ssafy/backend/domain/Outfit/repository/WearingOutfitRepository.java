package com.ssafy.backend.domain.Outfit.repository;

import com.ssafy.backend.domain.Outfit.entity.WearingOutfit;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WearingOutfitRepository extends JpaRepository<WearingOutfit, Long> {
    List<WearingOutfit> findByUserID(Long userID);
    void deleteByUserID(Long userID);
    void deleteByUserIDAndPart(Long userID, String part);
}