package com.ssafy.backend.domain.chatroom.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.backend.domain.chatroom.dto.ChatRoomGameResultDto;
import com.ssafy.backend.domain.chatroom.service.ChatRoomGameService;
import com.ssafy.backend.domain.user.model.entity.User;
import com.ssafy.backend.global.common.dto.Message;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/chatroom/game")
public class ChatRoomGameController {

    private final ChatRoomGameService chatRoomGameService;



    // 게임 시작
    @PatchMapping("/start/{chatRoomId}")
    public ResponseEntity<Message<Void>> gameStart(@PathVariable("chatRoomId") String chatRoomId) {
        chatRoomGameService.gameStart(chatRoomId);
        return ResponseEntity.ok().body(Message.success());
    }

    // 게임 상태 start -> end
    @PatchMapping("/startToEnd/{chatRoomId}")
    public ResponseEntity<Message<Void>> startToEnd(@PathVariable("chatRoomId") String chatRoomId) {
        chatRoomGameService.startToEnd(chatRoomId);
        return ResponseEntity.ok().body(Message.success());
    }

    // 게임 종료 (확인창 클릭)
    @PatchMapping("/end/{chatRoomId}")
    public ResponseEntity<Message<Void>> gameEnd(@PathVariable("chatRoomId") String chatRoomId) {
        chatRoomGameService.gameEnd(chatRoomId);
        return ResponseEntity.ok().body(Message.success());
    }

    // 게임 상태 변경
//    @PatchMapping("/status/{chatRoomId}")
//    public ResponseEntity<Message<Void>> roomStatusModify(@PathVariable("chatRoomId") String chatRoomId) {
//        chatRoomGameService.roomStatusModify(chatRoomId);
//        return ResponseEntity.ok().body(Message.success());
//    }

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
                                     @RequestBody String word) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(word);
        String wordValue = jsonNode.get("word").asText();

        String result = chatRoomGameService.forbiddenWordSetting(chatRoomId, user, wordValue);
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
