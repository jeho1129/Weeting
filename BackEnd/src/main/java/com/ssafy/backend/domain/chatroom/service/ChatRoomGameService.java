package com.ssafy.backend.domain.chatroom.service;

import com.ssafy.backend.domain.chatroom.dto.ChatRoomDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChatRoomGameService {

    private final RedisTemplate<String, Object> redisTemplate;

    public void roomStatusModify(String roomId, ChatRoomDto.RoomStatus roomStatus) {
        ChatRoomDto roomInfo = (ChatRoomDto) redisTemplate.opsForValue().get(roomId);

        switch (roomStatus) {
            case waiting:
                roomInfo.setRoomStatus(ChatRoomDto.RoomStatus.allready);
            case allready:
                roomInfo.setRoomStatus(ChatRoomDto.RoomStatus.wordsetting);
            case wordsetting:
                roomInfo.setRoomStatus(ChatRoomDto.RoomStatus.wordfinish);
            case wordfinish:
                roomInfo.setRoomStatus(ChatRoomDto.RoomStatus.start);
            case start:
                roomInfo.setRoomStatus(ChatRoomDto.RoomStatus.end);
            case end:
                roomInfo.setRoomStatus(ChatRoomDto.RoomStatus.waiting);
        }

    }


}
