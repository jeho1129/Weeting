package com.ssafy.backend.domain.chat.controller;

import com.ssafy.backend.domain.chat.document.Chat;
import com.ssafy.backend.domain.chat.dto.ChatMessageDto;
import com.ssafy.backend.domain.chat.service.ChatService;
import com.ssafy.backend.domain.user.model.entity.User;
import com.ssafy.backend.global.common.dto.Message;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;

    @MessageMapping("/api/v1/chat/{roomId}")
    public void send(ChatMessageDto chatMessageDto,
                     @DestinationVariable String roomId,
                     @AuthenticationPrincipal User user) {

        chatService.sendMessage(chatMessageDto, roomId, user);
    }


    @GetMapping("/api/v1/chat/history/{chatRoomId}")
    public ResponseEntity<Message<List<Chat>>> getChatHistory(@PathVariable("chatRoomId") String chatRoomId) {
        List<Chat> chatHistory = chatService.getChatHistory(chatRoomId);
        return ResponseEntity.ok().body(Message.success(chatHistory));
    }


}
