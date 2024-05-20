package com.ssafy.backend.domain.Outfit.service;

import com.ssafy.backend.domain.Outfit.entity.Outfit;
import com.ssafy.backend.domain.Outfit.entity.enums.OutfitType;
import com.ssafy.backend.domain.Outfit.repository.OutfitRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class OutfitInitializationService {

    private final OutfitRepository outfitRepository;

    @Autowired
    public OutfitInitializationService(OutfitRepository outfitRepository) {
        this.outfitRepository = outfitRepository;
    }

    @PostConstruct
    public void initializeOutfits() {
        // 현재 존재하는 모든 Outfit의 이름을 Set으로 수집
        Set<String> existingOutfitNames = outfitRepository.findAll().stream()
                .map(Outfit::getName)
                .collect(Collectors.toSet());

        // OutfitType 중 아직 없는 것만 수집
        List<Outfit> outfitsToSave = List.of(OutfitType.values()).stream()
                .filter(outfitType -> !existingOutfitNames.contains(outfitType.getName()))
                .map(Outfit::fromOutfitType)
                .collect(Collectors.toList());

        // 한 번에 배치 삽입
        if (!outfitsToSave.isEmpty()) {
            outfitRepository.saveAll(outfitsToSave);
        }
    }
}