package com.ssafy.backend.domain.Outfit.repository;

import com.ssafy.backend.domain.Outfit.entity.WearingOutfit;
import com.ssafy.backend.domain.user.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WearingOutfitRepository extends JpaRepository<WearingOutfit, Long> {
    List<WearingOutfit> findByUser_Id(Long userID);
    void deleteByUser_IdAndPart(Long userId, String part);

}