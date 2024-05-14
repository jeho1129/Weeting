package com.ssafy.backend.global.component;

import com.fasterxml.jackson.core.JsonProcessingException;
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

import java.io.IOException;
import java.util.List;


@RequiredArgsConstructor
@Slf4j
@Component
public class WebSocketChatRoomListHandler extends TextWebSocketHandler {

    private final ChatRoomService chatRoomService;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        super.afterConnectionEstablished(session);
        sendRooms(session);  // 연결이 완료되면 채팅방 목록을 자동으로 전송
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        System.out.println("연결 끊김 [" + session.getId() + "]");
    }

    private void sendRooms(WebSocketSession session) throws IOException {
        try {
            List<ChatRoomDto> rooms = chatRoomService.findAllChatRooms();  // 채팅방 목록 조회
            String roomsJson = objectMapper.writeValueAsString(rooms);     // JSON 형식으로 변환
            session.sendMessage(new TextMessage(roomsJson));               // 클라이언트에 JSON 데이터 전송
        } catch (JsonProcessingException e) {
            log.error("Error processing JSON", e);
            session.sendMessage(new TextMessage("{\"error\":\"Unable to fetch rooms.\"}"));
        }
    }



}
