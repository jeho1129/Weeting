package com.ssafy.backend.domain.Outfit.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class OutfitResponse {
    private Long outfitId;
    private String name;
    private String part;
    private String image;
    private String getCondition;
    private String description;
    private boolean isOwned;
}