package com.ssafy.backend.global.component;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.backend.domain.chatroom.dto.ChatMessageDto;

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
public class WebSocketChatRoomHandler extends TextWebSocketHandler {
    private final Map<String, ConcurrentHashMap<String, WebSocketSession>> roomSessions = new ConcurrentHashMap<>();

    @Autowired
    private ObjectMapper objectMapper;

    // 메시지 수신 및 처리
    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        ChatMessageDto chatMessage = objectMapper.readValue(message.getPayload(), ChatMessageDto.class);
        broadcastMessage(chatMessage);
    }

    // 메시지 브로드캐스트
    private void broadcastMessage(ChatMessageDto chatMessage) throws IOException {
        String formattedMessage = chatMessage.getNickname() + " : " + chatMessage.getMessage();
        TextMessage broadcastMessage = new TextMessage(formattedMessage);

        // 해당 채팅방의 모든 세션에 메시지 전송
        ConcurrentHashMap<String, WebSocketSession> sessions = roomSessions.get(chatMessage.getRoomId());
        if (sessions != null) {
            for (WebSocketSession session : sessions.values()) {
                if (session.isOpen()) {
                    session.sendMessage(broadcastMessage);
                }
            }
        }
    }

    // 새로운 세션 연결
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        String roomId = getRoomIdFromSession(session);
        roomSessions.computeIfAbsent(roomId, k -> new ConcurrentHashMap<>()).put(session.getId(), session);
    }

    // 세션 종료
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        String roomId = getRoomIdFromSession(session);
        Map<String, WebSocketSession> sessions = roomSessions.get(roomId);
        if (sessions != null) {
            sessions.remove(session.getId());
            if (sessions.isEmpty()) {
                roomSessions.remove(roomId);
            }
        }
    }

    // 세션에서 채팅방 ID 추출
    private String getRoomIdFromSession(WebSocketSession session) {
        // URI에서 채팅방 ID 추출하는 로직 구현, 예시: /chatroom/{roomId}
        String path = session.getUri().getPath();
        return path.substring(path.lastIndexOf('/') + 1);
    }


}
