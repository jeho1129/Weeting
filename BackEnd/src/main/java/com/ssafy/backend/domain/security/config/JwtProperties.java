package com.ssafy.backend.domain.security.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Data
@Component
@ConfigurationProperties(prefix = "spring.jwt")
public class JwtProperties {
    private String access;
    private String refresh;
    private Long accessTime;
    private Long refreshTime;
}

