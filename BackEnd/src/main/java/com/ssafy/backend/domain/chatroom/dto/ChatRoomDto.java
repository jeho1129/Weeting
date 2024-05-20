package com.ssafy.backend.domain.chatroom.dto;

import com.ssafy.backend.domain.chatroom.entity.Theme;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatRoomDto {

    /*
    * 방 상태 (대기중, 진행중)
    * */
    public enum RoomStatus {
        waiting, allready, wordsetting, wordfinish, start, end
    }

    /*
    * 게임 모드 (노말, 랭크)
    * */
    public enum RoomMode {
        normal, rank
    }

    private String roomId;  // 채팅방 고유값
    private String roomName;  // 방 제목
    private String roomPassword;  // 비밀번호
    private int roomMaxCnt;  // 참여가능 최대 유저 수
    private List<ChatRoomUserInfo> roomUsers;  // 참여 유저 id 목록
    private Theme roomTheme;  // 대화 주제
    private RoomStatus roomStatus;  // 방 상태
    private RoomMode roomMode;

    private String roomForbiddenTime;
    private String roomEndTime;

    private Boolean roomStatusFlag;

}
