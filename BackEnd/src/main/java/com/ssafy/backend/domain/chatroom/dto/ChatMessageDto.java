package com.ssafy.backend.domain.chatroom.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatMessageDto {

    private String roomId;  // 채팅방 고유값
    private String nickname;  // 채팅 입력 유저 닉네임
    private String message;  // 채팅 내용
}
