package com.ssafy.backend.domain.security.entity;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@Getter
@AllArgsConstructor
@Builder
@RedisHash(value = "blackList", timeToLive = 86400)
public class UnsafeToken {
    @Id
    private String token;

    @Column(nullable = false)
    private boolean invalid = true;

    // Constructor, getters, and setters
    public UnsafeToken(String token) {
        this.token = token;
    }
}

