package com.ssafy.backend.domain.Outfit.entity;

import com.ssafy.backend.domain.Outfit.entity.enums.OutfitType;
import jakarta.persistence.*;
import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Builder
@AllArgsConstructor
@ToString
@Table(name = "outfit")
public class Outfit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "outfit_id")
    private Long outfitId;

    @Column(name = "name")
    private String name;

    @Column(name = "part")
    private String part;

    @Column(name = "image")
    private String image;

    @Column(name = "get_condition")
    private String getCondition;

    @Column(name = "description")
    private String description;

    public static Outfit fromOutfitType(OutfitType outfitType) {
        return Outfit.builder()
                .name(outfitType.getName())
                .part(outfitType.getPart())
                .image(outfitType.getImage())
                .getCondition(outfitType.getGetCondition())
                .description(outfitType.getDescription())
                .build();
    }
}