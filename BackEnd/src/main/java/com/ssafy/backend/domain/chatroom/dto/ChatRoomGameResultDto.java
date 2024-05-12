package com.ssafy.backend.domain.chatroom.dto;


import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatRoomGameResultDto {

    private Long id;

    private String nickname;

    private float score;

    private Boolean isAlive;

}
