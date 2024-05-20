package com.ssafy.backend.domain.chatroom.service;

import com.ssafy.backend.domain.chatroom.dto.ChatRoomCreateRequestDto;
import com.ssafy.backend.domain.chatroom.dto.ChatRoomDto;
import com.ssafy.backend.domain.user.model.entity.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ChatRoomService {

    // 방 생성
    ChatRoomDto createRoom(ChatRoomCreateRequestDto chatRoomCreateRequestDto,
                           User user) throws Exception;

    // 방 입장
    ChatRoomDto EnterChatRoom(String ChatRoomId,
                              User user);

    // 방 전체 리스트 조회
//    List<ChatRoomDto> findAllChatRooms();
    List<ChatRoomDto> findAllChatRooms();

    // 방 정보 조회
    ChatRoomDto findChatRoom(String ChatRoomId);

    // 방 나가기
    void LeaveChatRoom(String ChatRoomId,
                       User user);

    // 빠른 입장
    String fastEnter(User user);
}
