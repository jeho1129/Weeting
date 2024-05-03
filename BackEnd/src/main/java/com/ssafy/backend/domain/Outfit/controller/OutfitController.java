package com.ssafy.backend.domain.Outfit.controller;

import com.ssafy.backend.domain.Outfit.dto.InventoryAddRequest;
import com.ssafy.backend.domain.Outfit.dto.OutfitResponse;
import com.ssafy.backend.domain.Outfit.dto.WearingOutfitResponse;
import com.ssafy.backend.domain.Outfit.entity.Inventory;
import com.ssafy.backend.domain.Outfit.entity.Outfit;
import com.ssafy.backend.domain.Outfit.entity.WearingOutfit;
import com.ssafy.backend.domain.Outfit.service.InventoryService;
import com.ssafy.backend.domain.Outfit.service.OutfitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/outfit")
public class OutfitController {

    private final OutfitService outfitService;
    private final InventoryService inventoryService;

    @Autowired
    public OutfitController(OutfitService outfitService, InventoryService inventoryService) {
        this.outfitService = outfitService;
        this.inventoryService = inventoryService;
    }

    // 전체 외형 조회. 유저가 소유 여부 함께 판별
    @GetMapping("/{userId}")
    public ResponseEntity<List<OutfitResponse>> getAllOutfitsWithOwnership(@PathVariable Long userId) {
        List<OutfitResponse> outfits = outfitService.findAllWithOwnership(userId);
        return new ResponseEntity<>(outfits, HttpStatus.OK);
    }

    // 선택된 아이템 착용하기
    @PutMapping("/{userId}/wear")
    public ResponseEntity<Void> wearOutfits(@PathVariable Long userId, @RequestBody Map<String, List<Long>> requestBody) {
        List<Long> outfitIds = requestBody.get("outfitId");
        inventoryService.wearOutfits(userId, outfitIds);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 현재 착용중인 아이템 정보 확인
    @GetMapping("/{userId}/worn")
    public ResponseEntity<List<WearingOutfitResponse>> getWearingOutfit(@PathVariable Long userId) {
        List<WearingOutfitResponse> wearingOutfitResponses = inventoryService.getWearingOutfit(userId);
        return new ResponseEntity<>(wearingOutfitResponses, HttpStatus.OK);
    }

    // 미사용 기능

    // 유저가 소유한 아이템만 조회. 미사용 예정
    @GetMapping("/{userId}/inventory")
    public ResponseEntity<List<Inventory>> getUserInventory(@PathVariable Long userId) {
        List<Inventory> inventory = inventoryService.findByUserId(userId);
        return new ResponseEntity<>(inventory, HttpStatus.OK);
    }

    // 인벤토리에 추가 기능. 미사용 예정
    @PostMapping("/{userId}/inventory")
    public ResponseEntity<Void> addToInventory(@PathVariable Long userId, @RequestBody InventoryAddRequest request) {
        inventoryService.addToInventory(userId, request.getOutfitId());
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}