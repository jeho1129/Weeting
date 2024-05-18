package com.ssafy.backend.domain.chatroom.controller;

import com.ssafy.backend.domain.chatroom.dto.ChatRoomGameResultDto;
import com.ssafy.backend.domain.chatroom.service.ChatRoomGameService;
import com.ssafy.backend.domain.chatroom.service.ChatRoomStatusService;
import com.ssafy.backend.domain.user.model.entity.User;
import com.ssafy.backend.global.common.dto.Message;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalTime;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/chatroom/game")
public class ChatRoomGameController {

    private final ChatRoomGameService chatRoomGameService;
    private final ChatRoomStatusService chatRoomStatusService;



    // 게임 시작
    @PatchMapping("/start/{chatRoomId}")
    public ResponseEntity<Message<Void>> gameStart(@PathVariable("chatRoomId") String chatRoomId) {
        chatRoomStatusService.gameStart(chatRoomId);
        return ResponseEntity.ok().body(Message.success());
    }

    // 게임 종료 (확인창 클릭)
    @PatchMapping("/end/{chatRoomId}")
    public ResponseEntity<Message<Void>> gameEnd(@PathVariable("chatRoomId") String chatRoomId) {
        chatRoomStatusService.gameEnd(chatRoomId);
        return ResponseEntity.ok().body(Message.success());
    }

    // 게임 상태 변경
    @PatchMapping("/status/{chatRoomId}")
    public ResponseEntity<Message<Void>> roomStatusModify(@PathVariable("chatRoomId") String chatRoomId) {
        chatRoomStatusService.roomStatusModify(chatRoomId);
        return ResponseEntity.ok().body(Message.success());
    }

    // ready 상태 변경
    @PatchMapping("/ready/{chatRoomId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Message<Boolean>> readyStatusTrans(@PathVariable("chatRoomId") String chatRoomId,
                                                              @AuthenticationPrincipal User user) {
        Boolean result = chatRoomGameService.readyStatusTrans(chatRoomId, user);
        return ResponseEntity.ok().body(Message.success(result));
    }


    // 죽었을 때 isAlive값 변경
    @PatchMapping("/dead/{chatRoomId}")
    public ResponseEntity<Message<String>> grilledChicken(@PathVariable("chatRoomId") String chatRoomId,
                                                            @AuthenticationPrincipal User user) {
        String result = chatRoomGameService.grilledChicken(chatRoomId, user);

        return ResponseEntity.ok().body(Message.success(result));
    }


    // 금지어 설정
    @PatchMapping("/wordsetting/{chatRoomId}")
    public ResponseEntity<Message<String>> forbiddenWordSetting(@PathVariable("chatRoomId") String chatRoomId,
                                     @AuthenticationPrincipal User user,
                                     @RequestBody String word) {
        String result = chatRoomGameService.forbiddenWordSetting(chatRoomId, user, word);
        return ResponseEntity.ok().body(Message.success(result));
    }


    // 게임 결과
    @GetMapping("/result/{chatRoomId}")
    public ResponseEntity<Message<List<ChatRoomGameResultDto>>> gameResult(@PathVariable("chatRoomId") String chatRoomId) {
        List<ChatRoomGameResultDto> result = chatRoomGameService.gameResult(chatRoomId);

        return ResponseEntity.ok().body(Message.success(result));
    }


    // 게임 결과 초기화
    @PatchMapping("/initialize/{chatRoomId}")
    public ResponseEntity<Message<String>> gameInitialize (@PathVariable("chatRoomId") String chatRoomId) {
        chatRoomGameService.gameInitialize(chatRoomId);
        String result = "유저 상태 초기화 완료 !";

        return ResponseEntity.ok().body(Message.success(result));
    }

}
