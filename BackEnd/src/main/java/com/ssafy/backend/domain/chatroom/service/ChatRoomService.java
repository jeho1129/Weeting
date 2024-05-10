package com.ssafy.backend.domain.chatroom.service;

import com.ssafy.backend.domain.chatroom.dto.ChatRoomCreateRequestDto;
import com.ssafy.backend.domain.chatroom.dto.ChatRoomDto;
import com.ssafy.backend.domain.chatroom.entity.ForbiddenWord;
import com.ssafy.backend.global.component.WebSocketChatRoomHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.*;

@Service
@RequiredArgsConstructor
public class ChatRoomService {

    private final RedisTemplate<String, Object> redisTemplate;

    public ChatRoomDto createRoom(ChatRoomCreateRequestDto chatRoomCreateRequestDto, Long userId) throws Exception {
        if (chatRoomCreateRequestDto.getRoomName() == null || chatRoomCreateRequestDto.getRoomName().trim().isEmpty()) {
            throw new IllegalArgumentException("방 제목을 입력하세요.");
        }
        if (chatRoomCreateRequestDto.getRoomMode() == null) {
            throw new IllegalArgumentException("방 모드를 선택하세요.");
        }

        ChatRoomDto chatRoomDto = ChatRoomDto.builder()
                .roomId(UUID.randomUUID().toString())
                .roomName(chatRoomCreateRequestDto.getRoomName())
                .roomPassword(chatRoomCreateRequestDto.getRoomPassword())
                .roomMaxCnt(chatRoomCreateRequestDto.getRoomMaxCnt())
                .roomUsers(new ArrayList<>(Arrays.asList(userId))) // 초기 멤버 리스트에 방 생성자 유저ID 포함
                .roomTheme("")
                .roomStatus(ChatRoomDto.RoomStatus.waiting)
                .roomMode(chatRoomCreateRequestDto.getRoomMode())
                .build();

        redisTemplate.opsForValue().set(chatRoomDto.getRoomId(), chatRoomDto);

        return chatRoomDto;
    }



    public List<ChatRoomDto> findAllChatRooms() {
        Set<String> ChatRoomIds = redisTemplate.keys("*");
        List<ChatRoomDto> ChatRooms = new ArrayList<>();
        for (String ChatRoomId : ChatRoomIds) {
            ChatRooms.add((ChatRoomDto) redisTemplate.opsForValue().get(ChatRoomId));
        }
        return ChatRooms;
    }


    public ChatRoomDto EnterChatRoom(String ChatRoomId,
                                     Long userId) {
        ChatRoomDto chatRoomDto = (ChatRoomDto) redisTemplate.opsForValue().get(ChatRoomId);
        chatRoomDto.getRoomUsers().add(userId);
        redisTemplate.opsForValue().set(ChatRoomId, chatRoomDto);
        return chatRoomDto;
    }


    public void LeaveChatRoom(String ChatRoomId,
                              Long userId) {
        ChatRoomDto room = (ChatRoomDto) redisTemplate.opsForValue().get(ChatRoomId);
        if (room != null && room.getRoomUsers().contains(userId)) {
            room.getRoomUsers().remove(userId);
            if (room.getRoomUsers().isEmpty()) {
                redisTemplate.delete(ChatRoomId);
            } else {
                redisTemplate.opsForValue().set(ChatRoomId, room);
            }
        }
    }

}
