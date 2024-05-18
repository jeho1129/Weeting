package com.ssafy.backend.global.component;

import com.ssafy.backend.domain.chatroom.service.ChatRoomStatusService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RedisKeyEventListener implements MessageListener {

    private final ChatRoomStatusService chatRoomStatusService;
    private final RedisTemplate<String, String> redisTemplate;

    @Override
    public void onMessage(Message message, byte[] pattern) {
        String key = redisTemplate.getStringSerializer().deserialize(message.getBody());
        String channel = redisTemplate.getStringSerializer().deserialize(message.getChannel());

        // "__keyevent@0__:set"이 포함된 경우에만 처리합니다.
        if (channel != null && channel.contains("__keyevent@0__:set") && key != null && key.startsWith("chatRoom:")) {
            System.out.println("입력된 key : " + key);
            handleKeyChange(key);
        }
    }
//    private final StringRedisSerializer serializer = new StringRedisSerializer();
//
//
//    public void onMessage(Message message, String pattern){
//        String key = serializer.deserialize(message.getBody());
//        // 변환된 문자열이 "chatRoom:"으로 시작하는지 확인합니다.
//        if (key != null && key.startsWith("chatRoom:")) {
//            System.out.println("입력된 key : " + key);
//            handleKeyChange(key);
//        }
//    }

    private void handleKeyChange(String key) {
        System.out.println("Key '" + key + "' has been changed.");
        // 변경된 키에 대한 상태 변경 메서드를 호출합니다.
        chatRoomStatusService.roomStatusModify(key);
    }

//    public void handleMessage(String message) {
//        // 패턴이 "__keyevent@0__:set"일 때, 변경된 키가 "chatroom:"으로 시작하는지 확인합니다.
//        if (message.startsWith("chatRoom:")) {
//            System.out.println("입력된 key : " + message);
//            handleKeyChange(message);
//        }
//    }
//
//    private void handleKeyChange(String key) {
//        System.out.println("Key '" + key + "' has been changed.");
//        // 변경된 키에 대한 상태 변경 메서드를 호출합니다.
//        chatRoomStatusService.roomStatusModify(key);
//    }

}