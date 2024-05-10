package com.ssafy.backend.domain.chatroom.service;

import com.ssafy.backend.domain.chatroom.dto.ChatRoomDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChatRoomGameService {

    public void roomStatusModify(String roomId, ChatRoomDto.RoomStatus roomStatus) {

        switch (roomStatus) {
            case waiting:
                break;
            case allready:
                break;
            case wordsetting:
                break;
            case wordfinish:
                break;
            case start:
                break;
            case end:
                break;
        }

    }


}
