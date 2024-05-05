package com.ssafy.backend.global.component;

import com.ssafy.backend.domain.chatroom.service.ChatRoomService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
@Slf4j
public class WebSocketChatRoomHandler extends TextWebSocketHandler {

    private final ChatRoomService chatRoomService;
    private final Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();

    public WebSocketChatRoomHandler(ChatRoomService chatRoomService) {
        this.chatRoomService = chatRoomService;
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        // 새로운 클라이언트가 연결되었을 때 실행되는 메서드
        sessions.put(session.getId(), session);
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        // 클라이언트로부터 메시지 수신
        String payload = message.getPayload();
        // 채팅 메시지 처리
        // (여기서는 간단히 받은 메시지를 모든 클라이언트에게 브로드캐스트)
        broadcastMessage(payload);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        // 클라이언트 연결이 종료되었을 때 실행되는 메서드
        sessions.remove(session.getId());
    }

    private void broadcastMessage(String message) throws IOException {
        // 채팅 메시지를 현재 연결된 모든 세션에 브로드캐스트
        for (WebSocketSession session : sessions.values()) {
            session.sendMessage(new TextMessage(message));
        }
    }
}
