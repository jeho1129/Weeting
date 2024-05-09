package com.ssafy.backend.domain.chatroom.controller;

import com.ssafy.backend.domain.chatroom.dto.ChatRoomCreateRequestDto;
import com.ssafy.backend.domain.chatroom.dto.ChatRoomDto;
import com.ssafy.backend.domain.chatroom.entity.Theme;
import com.ssafy.backend.domain.chatroom.service.ChatRoomService;
import com.ssafy.backend.domain.security.utils.JwtUtils;
import com.ssafy.backend.domain.user.model.entity.User;
import com.ssafy.backend.global.common.dto.Message;
import com.ssafy.backend.global.config.WebSocketConfig;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;

import org.springframework.security.access.prepost.PreAuthorize;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Random;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/chatroom")
public class ChatRoomController {

    private final ChatRoomService chatRoomService;
    private final WebSocketConfig webSocketConfig;

    private final Random random = new Random();


    // 채팅방 생성
    @PostMapping("/create")
//    @PreAuthorize("isAuthenticated()")  // 로그인 한 사용자만 접근 가능
    public ResponseEntity<Message<ChatRoomDto>> createRoom(@RequestBody ChatRoomCreateRequestDto chatRoomCreateRequestDto,
                                                           @AuthenticationPrincipal User user) {
        Long userId = user.getId();
        ChatRoomDto result = chatRoomService.createRoom(chatRoomCreateRequestDto, userId);
        return ResponseEntity.ok().body(Message.success(result));
    }


    // 채팅방 전체 목록 조회
    @GetMapping("/all")
//    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Message<?>> findAllChatRooms() {
        List<ChatRoomDto> result = chatRoomService.findAllChatRooms();
        if (result.isEmpty()) {
            String noChatRoomsMessage = "생성된 방이 없습니다.";
            return ResponseEntity.ok().body(Message.success(noChatRoomsMessage));
        } else {
            return ResponseEntity.ok().body(Message.success(result));
        }
    }


    // 특정 채팅방 입장
    @PatchMapping("/{chatRoomId}")
//    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Message<ChatRoomDto>> EnterChatRoom(@PathVariable("chatRoomId") String chatRoomId,
                                                              @AuthenticationPrincipal User user) {
        Long userId = user.getId();
        ChatRoomDto result = chatRoomService.EnterChatRoom(chatRoomId, userId);
        return ResponseEntity.ok().body(Message.success(result));
    }


    // 채팅방 나가기
    @PatchMapping("/leave/{chatRoomId}")
//    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Message<String>> LeaveChatRoom(@PathVariable("chatRoomId") String chatRoomId,
                                                       @AuthenticationPrincipal User user) {
        Long userId = user.getId();
        chatRoomService.LeaveChatRoom(chatRoomId, userId);
        String result = "나가기 완료 !";
        return ResponseEntity.ok().body(Message.success(result));
    }



    @GetMapping("/randomTheme")
    public Theme getRandomTheme() {
        Theme[] themes = Theme.values();
        return themes[random.nextInt(themes.length)];
    }
}