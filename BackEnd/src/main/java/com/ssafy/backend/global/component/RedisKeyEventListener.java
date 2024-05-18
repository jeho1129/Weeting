package com.ssafy.backend.global.component;

import com.ssafy.backend.domain.chatroom.service.ChatRoomGameService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RedisKeyEventListener {

    private final ChatRoomGameService chatRoomGameService; // ChatRoomService를 주입합니다.

    public void onMessage(String message, String pattern) {
        // 패턴이 "__keyevent@0__:set"일 때, 변경된 키가 "chatroom:"으로 시작하는지 확인합니다.
        if (message.startsWith("chatroom:")) {
            System.out.println("입력된 key : " + message);
            handleKeyChange(message);
        }
    }

    private void handleKeyChange(String key) {
        System.out.println("Key '" + key + "' has been changed.");
        // 변경된 키에 대한 상태 변경 메서드를 호출합니다.
        chatRoomGameService.roomStatusModify(key);
    }
}