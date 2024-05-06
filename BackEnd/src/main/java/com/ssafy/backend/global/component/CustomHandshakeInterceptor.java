package com.ssafy.backend.global.component;

import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.security.core.Authentication;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.support.HttpSessionHandshakeInterceptor;

import java.util.Map;

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
