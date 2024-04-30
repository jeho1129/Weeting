package com.ssafy.backend.domain.chatroom.service;

import com.ssafy.backend.domain.chatroom.dto.ChatRoomCreateRequestDto;
import com.ssafy.backend.domain.chatroom.dto.ChatRoomDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ChatRoomService {

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    public ChatRoomDto createRoom(ChatRoomCreateRequestDto chatRoomCreateRequestDto) {
        ChatRoomDto chatRoomDto = ChatRoomDto.builder()
                .roomId(UUID.randomUUID().toString())
                .name(chatRoomCreateRequestDto.getName())
                .password(chatRoomCreateRequestDto.getPassword())
                .maxMembers(chatRoomCreateRequestDto.getMaxMembers())
                .members(Arrays.asList()) // 초기 멤버 리스트는 빈 배열
                .theme("")
                .status(ChatRoomDto.RoomStatus.WAIT)
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
        chatRoomDto.getMembers().add(userId);
        return chatRoomDto;
    }

    public void LeaveChatRoom(String roomId,
                              Long userId) {
        ChatRoomDto room = (ChatRoomDto) redisTemplate.opsForValue().get(roomId);
        if (room != null && room.getMembers().contains(userId)) {
            room.getMembers().remove(userId);
            if (room.getMembers().isEmpty()) {
                redisTemplate.delete(roomId);
            } else {
                redisTemplate.opsForValue().set(roomId, room);
            }
        }
    }







}
