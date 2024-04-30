package com.ssafy.backend.domain.Outfit.entity;

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
@Table(name = "wearing_outfit")
public class WearingOutfit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "outfit_id")
    private Outfit outfit;

    @Column(name = "part")
    private String part;

    @Column(name = "image")
    private String image;

}