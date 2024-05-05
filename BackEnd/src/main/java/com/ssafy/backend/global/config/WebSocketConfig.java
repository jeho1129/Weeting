package com.ssafy.backend.global.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.backend.domain.chatroom.service.ChatRoomService;
import com.ssafy.backend.global.component.WebSocketChatRoomHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {


    private final ChatRoomService chatRoomService;

    public WebSocketConfig(ChatRoomService chatRoomService) {
        this.chatRoomService = chatRoomService;
    }

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(webSocketChatRoomHandler(), "/chat")
                .setAllowedOrigins("*");
    }

    @Bean
    public WebSocketChatRoomHandler webSocketChatRoomHandler() {
        return new WebSocketChatRoomHandler(chatRoomService);
    }



}
