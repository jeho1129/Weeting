package com.ssafy.backend.domain.security.config;

import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Data
@Component
@ConfigurationProperties(prefix = "spring.jwt")
public class JwtProperties {

    @Value("${jwt.access}")
    private String access;
    @Value("${jwt.accessTime}")
    private Long accessTime;
}

