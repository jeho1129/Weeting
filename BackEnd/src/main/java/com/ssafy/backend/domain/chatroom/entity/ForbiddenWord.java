package com.ssafy.backend.domain.chatroom.entity;

import com.ssafy.backend.domain.Outfit.entity.Outfit;
import com.ssafy.backend.domain.Outfit.entity.enums.OutfitType;
import jakarta.persistence.*;
import lombok.*;
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Builder
@AllArgsConstructor
@ToString
@Table(name = "forbidden_word")
public class ForbiddenWord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    // Theme 열거형을 사용하도록 수정
    @Enumerated(EnumType.STRING)
    private Theme theme;


}
