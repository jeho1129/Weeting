package com.ssafy.backend.domain.Outfit.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class InventoryAddRequest {
    private Long outfitId;

    public InventoryAddRequest() {
    }

    public InventoryAddRequest(Long outfitId) {
        this.outfitId = outfitId;
    }
}