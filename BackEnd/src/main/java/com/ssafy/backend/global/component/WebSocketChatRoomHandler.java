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

    @Autowired
    private ObjectMapper objectMapper;

    private final Map<String, ConcurrentHashMap<String, WebSocketSession>> roomSessions = new ConcurrentHashMap<>();


    // 채팅 수신 처리
    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String userNickname = (String) session.getAttributes().get("user");
        String payload = message.getPayload();
        ChatMessageDto chatMessage = objectMapper.readValue(payload, ChatMessageDto.class);
        chatMessage.setNickname(userNickname); // 로그인 유저의 닉네임 설정
        broadcastMessage(chatMessage);
    }


    // 채팅
    private void broadcastMessage(ChatMessageDto chatMessage) throws IOException {
        String formattedMessage = chatMessage.getNickname() + " : " + chatMessage.getMessage();  // 닉네임 : 채팅내용
        TextMessage broadcastMessage = new TextMessage(formattedMessage);

        // 해당 채팅방의 세션에 메시지 전송
        ConcurrentHashMap<String, WebSocketSession> sessions = roomSessions.get(chatMessage.getRoomId());
        if (sessions != null) {
            for (WebSocketSession session : sessions.values()) {
                if (session.isOpen()) {
                    session.sendMessage(broadcastMessage);
                }
            }
        }
    }

    // 세션 연결
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

    // 세션에서 roomID 추출
    private String getRoomIdFromSession(WebSocketSession session) {
        // URI에서 채팅방 ID 추출, 예시: /chatroom/{roomId}
        String path = session.getUri().getPath();
        return path.substring(path.lastIndexOf('/') + 1);
    }


}
