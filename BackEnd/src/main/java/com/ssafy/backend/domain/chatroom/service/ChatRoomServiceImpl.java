package com.ssafy.backend.domain.chatroom.service;

import com.ssafy.backend.domain.chatroom.dto.ChatRoomCreateRequestDto;
import com.ssafy.backend.domain.chatroom.dto.ChatRoomDto;
import com.ssafy.backend.domain.chatroom.dto.ChatRoomUserInfo;
import com.ssafy.backend.domain.user.model.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class ChatRoomServiceImpl implements ChatRoomService {

    private final RedisTemplate<String, Object> redisTemplate;




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
                ""
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

        String key = "chatRoom:" + chatRoomDto.getRoomId();
        redisTemplate.opsForValue().set(key, chatRoomDto);

        return chatRoomDto;
    }


    @Override
    public ChatRoomDto EnterChatRoom(String chatRoomId,
                                     User user) {
        String key = "chatRoom:" + chatRoomId;

        ChatRoomDto chatRoomDto = (ChatRoomDto) redisTemplate.opsForValue().get(key);

        boolean userAlreadyInRoom = chatRoomDto.getRoomUsers().stream()
                .anyMatch(userInfo -> userInfo.getId().equals(user.getId()));

        if (userAlreadyInRoom) {
            throw new IllegalArgumentException("넌 이미 방 안에 있다.");
        }

        if (chatRoomDto.getRoomMaxCnt() <= chatRoomDto.getRoomUsers().toArray().length) {
            throw new IllegalArgumentException("방 인원이 다 찼어요 ㅠ");
        }

        ChatRoomUserInfo userInfo = ChatRoomUserInfo.builder()
                .id(user.getId())
                .nickname(user.getNickname())
                .ready(false)
                .word("")
                .score(0.00F)
                .isAlive("")
                .build();

        chatRoomDto.getRoomUsers().add(userInfo);

        redisTemplate.opsForValue().set(key, chatRoomDto);

        return chatRoomDto;
    }


    @Override
    public ChatRoomDto findChatRoom(String roomId) {
        String key = "chatRoom:" + roomId;

        ChatRoomDto roomInfo = (ChatRoomDto) redisTemplate.opsForValue().get(key);

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

//        rabbitTemplate.convertAndSend(topicExchange.getName(), "room." + key, chatRoomDto);
        return chatRoomDto;
    }


    @Override
    public List<ChatRoomDto> findAllChatRooms() {
        Set<String> chatRoomIds = redisTemplate.keys("chatRoom:*");
        List<ChatRoomDto> chatRooms = new ArrayList<>();

        for (String chatRoomId : chatRoomIds) {
            ChatRoomDto chatRoom = (ChatRoomDto) redisTemplate.opsForValue().get(chatRoomId);

            chatRooms.add(chatRoom);
        }

//        rabbitTemplate.convertAndSend(topicExchange.getName(), "room.all", chatRooms);
        return chatRooms;
    }


    @Override
    public void LeaveChatRoom(String chatRoomId,
                              User user) {
        String key = "chatRoom:" + chatRoomId;
        ChatRoomDto roomInfo = (ChatRoomDto) redisTemplate.opsForValue().get(key);

        if (roomInfo != null) {
            roomInfo.getRoomUsers().removeIf(userInfo -> userInfo.getId().equals(user.getId()));
            if (roomInfo.getRoomUsers().isEmpty()) {
                redisTemplate.delete(chatRoomId);
            } else {
                redisTemplate.opsForValue().set(key, roomInfo);
            }
        }
    }


    @Override
    public String fastEnter(User user) {
        Set<String> chatRoomIds = redisTemplate.keys("chatRoom:*");

        String selectedRoomId = "";
        int minLeftUsers = Integer.MAX_VALUE;

        for (String chatRoomId : chatRoomIds) {
            ChatRoomDto chatRoom = (ChatRoomDto) redisTemplate.opsForValue().get(chatRoomId);

            if (chatRoom != null) {
                int spotsLeft = chatRoom.getRoomMaxCnt() - chatRoom.getRoomUsers().size();
                if (spotsLeft < minLeftUsers && spotsLeft > 0) {
                    minLeftUsers = spotsLeft;
                    selectedRoomId = chatRoom.getRoomId();
                }
            }
        }
        return selectedRoomId;
    }



}
