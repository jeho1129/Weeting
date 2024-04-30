package com.ssafy.backend.domain.Outfit.dto;

import com.ssafy.backend.domain.Outfit.entity.Outfit;
import com.ssafy.backend.domain.user.model.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class WearingOutfitResponse {
    private Long userID;
    private Long outfitId;
    private String part;
    private String image;

    public WearingOutfitResponse(User userID, Outfit outfitId, String part,
                                 String image) {

    }
}