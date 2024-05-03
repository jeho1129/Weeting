package com.ssafy.backend.domain.chatroom.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatRoomCreateRequestDto {

    private String name;  // 방 제목
    private String password;  // 비밀번호
    private int maxMembers;  // 참여가능 최대 유저 수

}
