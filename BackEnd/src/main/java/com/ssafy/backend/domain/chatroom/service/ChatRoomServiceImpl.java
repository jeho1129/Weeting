package com.ssafy.backend.domain.chatroom.service;

import com.ssafy.backend.domain.chat.dto.ChatDto;
import com.ssafy.backend.domain.chatroom.dto.ChatRoomCreateRequestDto;
import com.ssafy.backend.domain.chatroom.dto.ChatRoomDto;
import com.ssafy.backend.domain.chatroom.dto.ChatRoomUserInfo;
import com.ssafy.backend.domain.user.model.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
public class ChatRoomServiceImpl implements ChatRoomService {

    private final RedisTemplate<String, Object> redisTemplate;
    private final RabbitTemplate rabbitTemplate;
    private final TopicExchange topicExchange;

    @Override
    public ChatRoomDto createRoom(ChatRoomCreateRequestDto chatRoomCreateRequestDto,
                                  User user) throws Exception {
        if (chatRoomCreateRequestDto.getRoomName() == null || chatRoomCreateRequestDto.getRoomName().trim().isEmpty()) {
            throw new IllegalArgumentException("방 제목을 입력하세요.");
        }
        if (chatRoomCreateRequestDto.getRoomMode() == null) {
            throw new IllegalArgumentException("방 모드를 선택하세요.");
        }

        ChatRoomUserInfo userInfo = new ChatRoomUserInfo(
                user.getId(),
                user.getNickname(),
                false,
                "",
                0.00F,
                true
                );

        ChatRoomDto chatRoomDto = ChatRoomDto.builder()
                .roomId(UUID.randomUUID().toString())
                .roomName(chatRoomCreateRequestDto.getRoomName())
                .roomPassword(chatRoomCreateRequestDto.getRoomPassword())
                .roomMaxCnt(chatRoomCreateRequestDto.getRoomMaxCnt())
                .roomUsers(new ArrayList<>(Collections.singletonList(userInfo))) // 초기 멤버 리스트에 방 생성자 유저 정보 포함
                .roomTheme("")
                .roomStatus(ChatRoomDto.RoomStatus.waiting)
                .roomMode(chatRoomCreateRequestDto.getRoomMode())
                .build();

        redisTemplate.opsForValue().set(chatRoomDto.getRoomId(), chatRoomDto);

        return chatRoomDto;
    }


    @Override
    public ChatRoomDto EnterChatRoom(String ChatRoomId,
                                     User user) {
        ChatRoomDto chatRoomDto = (ChatRoomDto) redisTemplate.opsForValue().get(ChatRoomId);

        ChatRoomUserInfo userInfo = new ChatRoomUserInfo(
                user.getId(),
                user.getNickname(),
                false,
                "",
                0.00F,
                true
        );

        chatRoomDto.getRoomUsers().add(userInfo);

        redisTemplate.opsForValue().set(ChatRoomId, chatRoomDto);

        return chatRoomDto;
    }


    @Override
    public ChatRoomDto findChatRoom(String ChatRoomId) {
        ChatRoomDto roomInfo = (ChatRoomDto) redisTemplate.opsForValue().get(ChatRoomId);

        ChatRoomDto chatRoomDto = ChatRoomDto.builder()
                .roomId(roomInfo.getRoomId())
                .roomName(roomInfo.getRoomName())
                .roomPassword(roomInfo.getRoomPassword())
                .roomMaxCnt(roomInfo.getRoomMaxCnt())
                .roomUsers(roomInfo.getRoomUsers())
                .roomTheme(roomInfo.getRoomTheme())
                .roomStatus(roomInfo.getRoomStatus())
                .roomMode(roomInfo.getRoomMode())
                .build();

        rabbitTemplate.convertAndSend(topicExchange.getName(), "room." + ChatRoomId, chatRoomDto);

        return chatRoomDto;
    }


    @Override
    public List<ChatRoomDto> findAllChatRooms() {
        Set<String> chatRoomIds = redisTemplate.keys("*");

        List<ChatRoomDto> chatRooms = new ArrayList<>();

        for (String chatRoomId : chatRoomIds) {
            ChatRoomDto chatRoom = (ChatRoomDto) redisTemplate.opsForValue().get(chatRoomId);
            chatRooms.add(chatRoom);
        }

        rabbitTemplate.convertAndSend("amq.topic", "room.all", chatRooms);

        return chatRooms;
    }


    @Override
    public void LeaveChatRoom(String ChatRoomId,
                              User user) {
        ChatRoomDto roomInfo = (ChatRoomDto) redisTemplate.opsForValue().get(ChatRoomId);

        if (roomInfo != null) {
            roomInfo.getRoomUsers().removeIf(userInfo -> userInfo.getId().equals(user.getId()));
            if (roomInfo.getRoomUsers().isEmpty()) {
                redisTemplate.delete(ChatRoomId);
            } else {
                redisTemplate.opsForValue().set(ChatRoomId, roomInfo);
            }
        }
    }

}
