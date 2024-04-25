package com.ssafy.backend.domain.Outfit.dto;


import com.ssafy.backend.domain.Outfit.entity.Inventory;
import com.ssafy.backend.domain.Outfit.entity.Outfit;
import com.ssafy.backend.domain.Outfit.service.InventoryService;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class InventoryAddRequest {
    private Long userId;
    private String condition;

    // 기본 생성자
    public InventoryAddRequest() {
    }

    // 생성자
    public InventoryAddRequest(Long userId, String condition) {
        this.userId = userId;
        this.condition = condition;
    }}

    // Getter 및 Setter 메서드는 Lombok 어노테이션으로 대체

    // 조건을 만족하는 아이템을 인벤토리에 추가하는 메서드
//    public void addToInventory(InventoryService inventoryService, OutfitService outfitService) {
//        List<Outfit> matchingOutfits = outfitService.findByCondition(condition);
//
//        for (Outfit outfit : matchingOutfits) {
//            Inventory inventory = new Inventory();
//            inventory.setMemberId(memberId);
//            inventory.setOutfitId(outfit.getOutfitId());
//            inventory.setIsWeared(false);
//
//            inventoryService.save(inventory);
//        }
//    }
//}