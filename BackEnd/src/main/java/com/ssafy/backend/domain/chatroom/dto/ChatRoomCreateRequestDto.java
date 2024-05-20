package com.ssafy.backend.domain.chatroom.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatRoomCreateRequestDto {

    private String roomName;  // 방 제목
    private String roomPassword;  // 비밀번호
    private int roomMaxCnt;  // 참여가능 최대 유저 수
    private ChatRoomDto.RoomMode roomMode;

}
