package com.ssafy.backend.domain.Outfit.service;

import com.ssafy.backend.domain.Outfit.entity.Outfit;
import com.ssafy.backend.domain.Outfit.entity.enums.OutfitType;
import com.ssafy.backend.domain.Outfit.repository.OutfitRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OutfitInitializationService {

    private final OutfitRepository outfitRepository;

    @Autowired
    public OutfitInitializationService(OutfitRepository outfitRepository) {
        this.outfitRepository = outfitRepository;
    }

    @PostConstruct
    public void initializeOutfits() {
        for (OutfitType outfitType : OutfitType.values()) {
            if (outfitRepository.findByName(outfitType.getName()) == null) {
                Outfit outfit = Outfit.fromOutfitType(outfitType);
                outfitRepository.save(outfit);
            }
        }
    }
}