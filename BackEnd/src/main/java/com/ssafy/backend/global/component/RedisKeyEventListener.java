package com.ssafy.backend.global.component;

import com.ssafy.backend.domain.chatroom.service.ChatRoomStatusService;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.data.redis.serializer.StringRedisSerializer;
import org.springframework.stereotype.Service;

@Service
public class RedisKeyEventListener implements MessageListener {

    private final StringRedisSerializer serializer = new StringRedisSerializer();
    private final ChatRoomStatusService chatRoomStatusService;

    public RedisKeyEventListener(ChatRoomStatusService chatRoomStatusService) {
        this.chatRoomStatusService = chatRoomStatusService;
    }

    @Override
    public void onMessage(Message message, byte[] pattern) {
        String key = serializer.deserialize(message.getBody());

        // 변환된 문자열이 "chatRoom:"으로 시작하는지 확인합니다.
        if (key != null && key.startsWith("chatRoom:")) {
            System.out.println("입력된 key : " + key);
            handleKeyChange(key);
        }
    }

    private void handleKeyChange(String key) {
        System.out.println("Key '" + key + "' has been changed.");
        // 변경된 키에 대한 상태 변경 메서드를 호출합니다.
        chatRoomStatusService.roomStatusModify(key);
    }
}