package com.ssafy.backend.global.config;


import com.ssafy.backend.domain.chatroom.service.ChatRoomService;
import com.ssafy.backend.global.component.RabbitMqProps;
import com.ssafy.backend.global.component.WebSocketChatRoomHandler;
import lombok.RequiredArgsConstructor;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.*;

@Configuration
@RequiredArgsConstructor
@EnableWebSocketMessageBroker
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer, WebSocketMessageBrokerConfigurer {

    private final RabbitMqProps rabbitMqProps;
    private final WebSocketChatRoomHandler webSocketChatRoomHandler;


    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler((WebSocketHandler) webSocketChatRoomHandler, "/ws/chatroom/list")
                .setAllowedOrigins("*");
    }


    /*
    * STOMP 구성
    * ws://{host}:{port}/ws
    * */
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws")
                .setAllowedOrigins("*");
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.setApplicationDestinationPrefixes("/pub") // pub으로 시작되는 메시지는 브로커로 보내짐, 메시지를 publish하는 경로
                .setUserDestinationPrefix("/users") // 특정 사용자에게 메시지 전송시 사용할 주소
                .enableStompBrokerRelay("/queue", "/topic", "/exchange","/amq/queue") // subscribe 경로를 설정, 메시지 브로커에서 지원하는 접두사들
                .setRelayHost(rabbitMqProps.getHost())
                .setVirtualHost("/")
                .setRelayPort(61613) // STOMP 기본 포트
                .setSystemLogin(rabbitMqProps.getUsername())
                .setSystemPasscode(rabbitMqProps.getPassword())
                .setClientLogin(rabbitMqProps.getUsername())
                .setClientPasscode(rabbitMqProps.getPassword());
    }


}
