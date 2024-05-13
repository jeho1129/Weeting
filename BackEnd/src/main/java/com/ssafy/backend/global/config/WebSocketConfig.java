package com.ssafy.backend.global.config;


import com.ssafy.backend.global.component.RabbitMqProps;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@RequiredArgsConstructor
@EnableWebSocketMessageBroker
@EnableWebSocket
//public class WebSocketConfig implements WebSocketConfigurer, WebSocketMessageBrokerConfigurer {
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    private final RabbitMqProps rabbitMqProps;
//    private final WebSocketChatRoomHandler webSocketChatRoomHandler;
//    private final WebSocketChatRoomGetHandler webSocketChatRoomGetHandler;


//    /*
//     * WebSocket은 path 경로에 변수를 넣을 수 없다 !
//     * 그래서 메시지에서 변수를 파싱해야 한다.
//     * */
//    @Override
//    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
//        // 방 목록 전체 조회
//        registry.addHandler((WebSocketHandler) webSocketChatRoomHandler, "/ws/chatroom/list")
//                .setAllowedOrigins("*");
//        // 방 상태 조회
//        registry.addHandler((WebSocketHandler) webSocketChatRoomGetHandler, "/ws/chatroom/get")
//                .setAllowedOrigins("*");
//    }


    /*
    * STOMP 구성
    * 클라이언트가 WebSocket 서버에 연결하기 위한 EndPoint
    * ws://{host}:{port}/ws
    * */
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws")
                .setAllowedOrigins("*");
    }


    /*
    * 메세지 브로커 옵션을 설정하는 메서드
    * 메세지 핸들러의 라우팅 설정 및 브로커가 사용할 목적지 접두사 정의
    * */
    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.setApplicationDestinationPrefixes("/pub") // pub으로 시작되는 메시지는 브로커로 보내짐, 메시지를 publish하는 경로
                .setUserDestinationPrefix("/users") // 특정 사용자에게 메시지 전송시 사용할 주소
                .enableStompBrokerRelay("/queue", "/topic", "/exchange","/amq/queue") // subscribe 경로를 설정, 메시지 브로커에서 지원하는 접두사들
//                .setRelayHost(rabbitMqProps.getHost())
                .setRelayHost("localhost")
                .setVirtualHost("/")
                .setRelayPort(61613) // STOMP 기본 포트
                .setSystemLogin(rabbitMqProps.getUsername())
                .setSystemPasscode(rabbitMqProps.getPassword())
                .setClientLogin(rabbitMqProps.getUsername())
                .setClientPasscode(rabbitMqProps.getPassword());
    }


}
