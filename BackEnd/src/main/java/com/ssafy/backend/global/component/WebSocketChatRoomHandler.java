package com.ssafy.backend.global.component;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.backend.domain.chatroom.dto.ChatRoomDto;
import com.ssafy.backend.domain.chatroom.service.ChatRoomService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;


@RequiredArgsConstructor
@Slf4j
@Component
public class WebSocketChatRoomHandler extends TextWebSocketHandler {

    private final ChatRoomService chatRoomService;

    private List<WebSocketSession> sessions = new CopyOnWriteArrayList<>();
    private ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        sessions.add(session);
        broadcastChatRooms(); // 최초 연결시 채팅방 목록 전송
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        sessions.remove(session);
    }


    // 채팅방 전체 목록 조회
    public void broadcastChatRooms() throws Exception {
        List<ChatRoomDto> chatRooms = chatRoomService.findAllChatRooms();
        String payload = objectMapper.writeValueAsString(chatRooms);
        TextMessage message = new TextMessage(payload);
        for (WebSocketSession session : sessions) {
            session.sendMessage(message);
        }
    }


}
