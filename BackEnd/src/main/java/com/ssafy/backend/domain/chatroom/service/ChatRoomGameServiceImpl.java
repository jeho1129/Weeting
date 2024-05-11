package com.ssafy.backend.domain.chatroom.service;

import com.ssafy.backend.domain.chatroom.dto.ChatRoomDto;
import com.ssafy.backend.domain.chatroom.dto.ChatRoomUserInfo;
import com.ssafy.backend.domain.user.model.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChatRoomGameServiceImpl implements ChatRoomGameService {

    private final RedisTemplate<String, Object> redisTemplate;

    @Override
    public ChatRoomDto roomStatusModify(String ChatRoomId,
                                 ChatRoomDto.RoomStatus roomStatus) {
        ChatRoomDto roomInfo = (ChatRoomDto) redisTemplate.opsForValue().get(ChatRoomId);

        if (roomInfo == null) {
            throw new IllegalStateException("채팅방 정보를 불러올 수 없습니다 ㅠㅠ");
        }

        switch (roomStatus) {
            case waiting:
                roomInfo.setRoomStatus(ChatRoomDto.RoomStatus.allready);
                break;
            case allready:
                roomInfo.setRoomStatus(ChatRoomDto.RoomStatus.wordsetting);
                break;
            case wordsetting:
                roomInfo.setRoomStatus(ChatRoomDto.RoomStatus.wordfinish);
                break;
            case wordfinish:
                roomInfo.setRoomStatus(ChatRoomDto.RoomStatus.start);
                break;
            case start:
                roomInfo.setRoomStatus(ChatRoomDto.RoomStatus.end);
                break;
            case end:
                roomInfo.setRoomStatus(ChatRoomDto.RoomStatus.waiting);
                break;
            default:
                throw new IllegalStateException("방 상태 변경 중 에러 발생 !");
        }

        redisTemplate.opsForValue().set(ChatRoomId, roomInfo);

        return roomInfo;

    }


    @Override
    public void readyStatusTrans(String roomId,
                                 User user) {

        ChatRoomDto roomInfo = (ChatRoomDto) redisTemplate.opsForValue().get(roomId);
        if (roomInfo == null) {
            throw new IllegalStateException("채팅방 정보를 불러올 수 없습니다 ㅠㅠ");
        }

        for (ChatRoomUserInfo userInfo : roomInfo.getRoomUsers()) {
            if (userInfo.getId().equals(user.getId())) {
                Boolean userReadyStatus = userInfo.getReady();

                userInfo.setReady(!userReadyStatus);

                redisTemplate.opsForValue().set(roomId, roomInfo);

                break;
            }
        }

    }


}
