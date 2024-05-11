package com.ssafy.backend.domain.chatroom.service;

import com.ssafy.backend.domain.chatroom.dto.ChatRoomDto;
import com.ssafy.backend.domain.user.model.entity.User;
import org.springframework.stereotype.Service;

@Service
public interface ChatRoomGameService {

    // 방 상태 변경
    ChatRoomDto roomStatusModify(String roomId,
                          ChatRoomDto.RoomStatus roomStatus);

    // ready 상태 변경
    void readyStatusTrans(String roomId,
                          User user);
}
