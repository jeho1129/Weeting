package com.ssafy.backend.domain.Outfit.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.ssafy.backend.domain.user.model.entity.User;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Builder
@AllArgsConstructor
@ToString
@Table(name = "inventory")
public class Inventory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long inventoryId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private User user;

    @ManyToOne
    @JoinColumn(name = "outfit_id")
    @JsonBackReference
    private Outfit outfit;

    @Column(name = "is_owned")
    private Boolean isOwned;
}