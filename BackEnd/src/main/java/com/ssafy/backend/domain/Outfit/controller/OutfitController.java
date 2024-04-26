package com.ssafy.backend.domain.Outfit.controller;

import com.ssafy.backend.domain.Outfit.dto.InventoryAddRequest;
import com.ssafy.backend.domain.Outfit.dto.OutfitResponse;
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

    @GetMapping("/{userId}")
    public ResponseEntity<List<OutfitResponse>> getAllOutfitsWithOwnership(@PathVariable Long userId) {
        List<OutfitResponse> outfits = outfitService.findAllWithOwnership(userId);
        return new ResponseEntity<>(outfits, HttpStatus.OK);
    }

    @GetMapping("/{userId}/inventory")
    public ResponseEntity<List<Inventory>> getUserInventory(@PathVariable Long userId) {
        List<Inventory> inventory = inventoryService.findByUserId(userId);
        return new ResponseEntity<>(inventory, HttpStatus.OK);
    }

    @PostMapping("/{userId}/inventory")
    public ResponseEntity<Void> addToInventory(@PathVariable Long userId, @RequestBody InventoryAddRequest request) {
        inventoryService.addToInventory(userId, request.getOutfitId());
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PutMapping("/{userId}/wear/{outfitId}")
    public ResponseEntity<Void> wearOutfit(@PathVariable Long userId, @PathVariable Long outfitId) {
        inventoryService.wearOutfit(userId, outfitId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/{userId}/wearing")
    public ResponseEntity<WearingOutfit> getWearingOutfit(@PathVariable Long userId) {
        WearingOutfit wearingOutfit = inventoryService.getWearingOutfit(userId);
        return new ResponseEntity<>(wearingOutfit, HttpStatus.OK);
    }
}