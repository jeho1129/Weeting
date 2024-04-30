package com.ssafy.backend.domain.Outfit.service;

import com.ssafy.backend.domain.Outfit.dto.OutfitResponse;
import com.ssafy.backend.domain.Outfit.entity.Inventory;
import com.ssafy.backend.domain.Outfit.entity.Outfit;
import com.ssafy.backend.domain.Outfit.repository.InventoryRepository;
import com.ssafy.backend.domain.Outfit.repository.OutfitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OutfitService {

    private final OutfitRepository outfitRepository;
    private final InventoryRepository inventoryRepository;

    @Autowired
    public OutfitService(OutfitRepository outfitRepository, InventoryRepository inventoryRepository) {
        this.outfitRepository = outfitRepository;
        this.inventoryRepository = inventoryRepository;
    }

    public List<OutfitResponse> findAllWithOwnership(Long userId) {
        List<Outfit> outfits = outfitRepository.findAll();
        List<Inventory> inventories = inventoryRepository.findByUser_Id(userId);

        return outfits.stream()
                .map(outfit -> {
                    boolean isOwned = inventories.stream()
                            .anyMatch(inventory -> inventory.getOutfit().getOutfitId().equals(outfit.getOutfitId()));
                    return new OutfitResponse(
                            outfit.getOutfitId(),
                            outfit.getName(),
                            outfit.getPart(),
                            outfit.getImage(),
                            outfit.getGetCondition(),
                            outfit.getDescription(),
                            isOwned
                    );
                })
                .collect(Collectors.toList());
    }
}