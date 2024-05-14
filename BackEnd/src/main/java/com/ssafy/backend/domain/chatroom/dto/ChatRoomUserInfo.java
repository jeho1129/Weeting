package com.ssafy.backend.domain.chatroom.dto;


import lombok.*;

import java.util.Objects;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class ChatRoomUserInfo {

    private Long id;

    private String nickname;

    private Boolean ready;

    private String word;

    private float score;

    private String isAlive;


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ChatRoomUserInfo that = (ChatRoomUserInfo) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

}
