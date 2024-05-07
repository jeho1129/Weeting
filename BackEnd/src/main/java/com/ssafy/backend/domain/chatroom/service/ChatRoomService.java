package com.ssafy.backend.domain.chatroom.service;

import com.ssafy.backend.domain.chatroom.dto.ChatRoomCreateRequestDto;
import com.ssafy.backend.domain.chatroom.dto.ChatRoomDto;
import com.ssafy.backend.domain.chatroom.entity.ForbiddenWord;
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

    public Optional<?> createRoom(ChatRoomCreateRequestDto chatRoomCreateRequestDto, Long userId) {
        String noRoomName = "방 제목을 입력하세요.";
        ChatRoomDto chatRoomDto = ChatRoomDto.builder()
                .roomId(UUID.randomUUID().toString())
                .roomName(chatRoomCreateRequestDto.getRoomName())
                .roomPassword(chatRoomCreateRequestDto.getRoomPassword())
                .roomMaxCnt(chatRoomCreateRequestDto.getRoomMaxCnt())
                .members(new ArrayList<>(Arrays.asList(userId))) // 초기 멤버 리스트에 방 생성자 유저ID 포함
                .theme("")
                .status(ChatRoomDto.RoomStatus.WAIT)
                .mode(chatRoomCreateRequestDto.getMode())
                .build();

        // 방 제목이 비어 있는지 확인
        if (chatRoomDto.getRoomName() == null || chatRoomDto.getRoomName().trim().isEmpty()) {
            return Optional.of(noRoomName);
        } else {
            redisTemplate.opsForValue().set(chatRoomDto.getRoomId(), chatRoomDto);
            return Optional.of(chatRoomDto);
        }
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
        chatRoomDto.getMembers().add(userId);
        redisTemplate.opsForValue().set(ChatRoomId, chatRoomDto);
        return chatRoomDto;
    }

    public void LeaveChatRoom(String ChatRoomId,
                              Long userId) {
        ChatRoomDto room = (ChatRoomDto) redisTemplate.opsForValue().get(ChatRoomId);
        if (room != null && room.getMembers().contains(userId)) {
            room.getMembers().remove(userId);
            if (room.getMembers().isEmpty()) {
                redisTemplate.delete(ChatRoomId);
            } else {
                redisTemplate.opsForValue().set(ChatRoomId, room);
            }
        }
    }

}
