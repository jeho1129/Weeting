package com.ssafy.backend.global.component;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.backend.domain.chatroom.dto.ChatRoomDto;
import com.ssafy.backend.domain.chatroom.service.ChatRoomService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.Map;

@RequiredArgsConstructor
@Slf4j
@Component
public class WebSocketChatRoomGetHandler extends TextWebSocketHandler {

    private final ChatRoomService chatRoomService;
    private final ObjectMapper objectMapper = new ObjectMapper();


    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String payload = message.getPayload();
        Map<String, String> messageMap = objectMapper.readValue(payload, Map.class);
        String roomId = messageMap.get("roomId");

        if (roomId != null && !roomId.isEmpty()) {
            handleRoomRequest(session, roomId);
        } else {
            session.sendMessage(new TextMessage("{\"error\": \"Room ID is missing in the request.\"}"));
        }
    }


    private void handleRoomRequest(WebSocketSession session, String roomId) throws IOException {
        try {
            ChatRoomDto chatRoomDto = chatRoomService.findChatRoom(roomId);
            if (chatRoomDto != null) {
                String roomJson = objectMapper.writeValueAsString(chatRoomDto);
                session.sendMessage(new TextMessage(roomJson));
            } else {
                session.sendMessage(new TextMessage("{\"error\": \"Room not found.\"}"));
            }
        } catch (Exception e) {
            session.sendMessage(new TextMessage("{\"error\": \"Error retrieving room information.\"}"));
        }
    }



}
