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



@RequiredArgsConstructor
@Slf4j
@Component
public class WebSocketChatRoomListHandler extends TextWebSocketHandler {

    private final ChatRoomService chatRoomService;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        session.sendMessage(new TextMessage("Connection Established"));
    }


    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        if ("FETCH_ROOMS".equals(message.getPayload())) {
            sendRooms(session);
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        System.out.println("Connection Closed [" + session.getId() + "]");
    }

    private void sendRooms(WebSocketSession session) throws IOException {
        session.sendMessage(new TextMessage(objectMapper.writeValueAsString(chatRoomService.findAllChatRooms())));
    }



}
