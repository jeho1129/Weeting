package com.ssafy.backend.domain.chatroom.controller;

import com.ssafy.backend.domain.chatroom.dto.ChatRoomDto;
import com.ssafy.backend.domain.chatroom.service.ChatRoomGameService;
import com.ssafy.backend.domain.user.model.entity.User;
import com.ssafy.backend.global.common.dto.Message;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/chatroom/game")
public class ChatRoomGameController {

    private final ChatRoomGameService chatRoomGameService;

    // 방 상태 변경
    @PatchMapping("/status/{chatRoomId}")
    public ResponseEntity<Message<ChatRoomDto>> roomStatusModify(String roomId,
                                                                 ChatRoomDto.RoomStatus roomStatus) {

    }

    // ready 상태 변경
    @PatchMapping("/ready/{chatRoomId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Message<String>> readyStatusTrans(@PathVariable("chatRoomId") String chatRoomId,
                                                              @AuthenticationPrincipal User user) {
        chatRoomGameService.readyStatusTrans(chatRoomId, user);
        String result = "준비 상태 변경 완료 !";
        return ResponseEntity.ok().body(Message.success(result));
    }

}
