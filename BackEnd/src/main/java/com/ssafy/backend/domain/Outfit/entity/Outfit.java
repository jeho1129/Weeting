package com.ssafy.backend.domain.Outfit.entity;


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
    @Column(name = "outfit_id")
    private Long outfitId;

    @Column(name = "name")
    private String name;

    @Column(name = "image")
    private String image;

    @Column(name = "part")
    private String part;

    @Column(name = "getCondition")
    private String getCondition;

    @Column(name = "description")
    private String description;
}
