package com.ssafy.backend.domain.Outfit.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Builder
@AllArgsConstructor
@ToString
@Table(name = "wearing_outfit")
public class WearingOutfit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "userId")
    private Long userID;

    @Column(name = "outfitId")
    private Long outfitId;
}