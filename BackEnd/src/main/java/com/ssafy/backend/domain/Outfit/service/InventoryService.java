package com.ssafy.backend.domain.Outfit.service;

import com.ssafy.backend.domain.Outfit.entity.Inventory;
import com.ssafy.backend.domain.Outfit.entity.Outfit;
import com.ssafy.backend.domain.Outfit.entity.WearingOutfit;
import com.ssafy.backend.domain.Outfit.repository.InventoryRepository;
import com.ssafy.backend.domain.Outfit.repository.OutfitRepository;
import com.ssafy.backend.domain.Outfit.repository.WearingOutfitRepository;
import com.ssafy.backend.domain.user.model.entity.User;
import com.ssafy.backend.domain.user.model.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class InventoryService {

    private final InventoryRepository inventoryRepository;
    private final OutfitRepository outfitRepository;
    private final WearingOutfitRepository wearingOutfitRepository;
    private final UserRepository userRepository;

    @Autowired
    public InventoryService(InventoryRepository inventoryRepository, OutfitRepository outfitRepository,
                            WearingOutfitRepository wearingOutfitRepository, UserRepository userRepository) {
        this.inventoryRepository = inventoryRepository;
        this.outfitRepository = outfitRepository;
        this.wearingOutfitRepository = wearingOutfitRepository;
        this.userRepository = userRepository;
    }

    public List<Inventory> findByUserId(Long userId) {
        return inventoryRepository.findByUser_Id(userId);
    }

    public void addToInventory(Long userId, Long outfitId) {
        User user = userRepository.findById(userId).orElseThrow();
        Outfit outfit = outfitRepository.findById(outfitId).orElseThrow();

        Inventory inventory = Inventory.builder()
                .user(user)
                .outfit(outfit)
                .isOwned(true)
                .build();

        inventoryRepository.save(inventory);
    }
    @Transactional
    public void wearOutfit(Long userId, Long outfitId) {
        // 사용자의 인벤토리에서 해당 아이템이 소유 중인지 확인
        Inventory inventory = inventoryRepository.findByUser_IdAndOutfit_OutfitId(userId, outfitId);
        if (inventory == null || !inventory.getIsOwned()) {
            throw new IllegalArgumentException("User does not own the outfit with ID: " + outfitId);
        }
        // 착용할 외형의 분류 조회
        Outfit outfit = outfitRepository.findById(outfitId)
                .orElseThrow(() -> new IllegalArgumentException("Outfit not found with ID: " + outfitId));
        String part = outfit.getPart();

        // 기존에 같은 분류의 착용 중인 외형이 있다면 제거
        wearingOutfitRepository.deleteByUserIDAndPart(userId, part);

        // 새로운 외형 착용 정보 저장
        WearingOutfit wearingOutfit = WearingOutfit.builder()
                .userID(userId)
                .outfitId(outfitId)
                .part(part)
                .build();

        wearingOutfitRepository.save(wearingOutfit);
    }

    public List<WearingOutfit> getWearingOutfit(Long userId) {
        return wearingOutfitRepository.findByUserID(userId);
    }
}