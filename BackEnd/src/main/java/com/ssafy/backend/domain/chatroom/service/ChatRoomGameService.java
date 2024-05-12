package com.ssafy.backend.domain.chatroom.service;

import com.ssafy.backend.domain.chatroom.dto.ChatRoomDto;
import com.ssafy.backend.domain.chatroom.dto.ChatRoomGameResultDto;
import com.ssafy.backend.domain.user.model.entity.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ChatRoomGameService {

    // 방 상태 변경
    ChatRoomDto roomStatusModify(String roomId);

    // ready 상태 변경
    void readyStatusTrans(String roomId,
                          User user);

    // 게임 결과 반환
    List<ChatRoomGameResultDto> gameResult(String chatRoomId);
}
