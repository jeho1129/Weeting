package com.ssafy.backend.global.component;

import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.security.core.Authentication;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.support.HttpSessionHandshakeInterceptor;

import java.util.Map;

/*
* http 요청에서 인터셉트 해서 사용자의 정보를 웹소켓으로 갖고 간다?
* */
public class CustomHandshakeInterceptor extends HttpSessionHandshakeInterceptor {
    @Override
    public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler, Map<String, Object> attributes) throws Exception {
        Authentication authentication = (Authentication) request.getPrincipal();
        if (authentication != null && authentication.isAuthenticated()) {
            attributes.put("user", authentication.getName());
        }
        return super.beforeHandshake(request, response, wsHandler, attributes);
    }
}
