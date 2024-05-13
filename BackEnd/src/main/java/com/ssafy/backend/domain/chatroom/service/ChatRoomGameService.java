package com.ssafy.backend.domain.chatroom.service;

import com.ssafy.backend.domain.chatroom.dto.ChatRoomGameResultDto;
import com.ssafy.backend.domain.user.model.entity.User;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.util.List;

@Service
public interface ChatRoomGameService {

    // 방 상태 변경
    LocalTime roomStatusModify(String roomId);

    // ready 상태 변경
    void readyStatusTrans(String roomId,
                          User user);

    // 게임 결과 반환
    List<ChatRoomGameResultDto> gameResult(String chatRoomId);

    // 게임 결과 초기화
    void gameInitialize(String chatRoomId);


    // 금지어 설정
    void forbiddenWordSetting(String chatRoomId,
                              User user,
                              String word);

}
