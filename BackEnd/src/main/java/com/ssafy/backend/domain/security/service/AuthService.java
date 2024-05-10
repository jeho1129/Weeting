package com.ssafy.backend.domain.security.service;

import com.ssafy.backend.domain.security.dto.GeneratedToken;
import com.ssafy.backend.domain.security.dto.LoginResponse;
import com.ssafy.backend.domain.security.exception.AuthErrorCode;
import com.ssafy.backend.domain.security.exception.AuthException;
import com.ssafy.backend.domain.user.exception.UserErrorCode;
import com.ssafy.backend.domain.user.exception.UserException;
import com.ssafy.backend.domain.user.model.entity.User;
import com.ssafy.backend.domain.user.model.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@RequiredArgsConstructor
@Slf4j
@Service
public class AuthService {
    private final TokenService tokenService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RedisTemplate<String, Object> redisTemplate;

    public LoginResponse login(String account, String password) {
        User user = userRepository.findByAccount(account)
                .orElseThrow(() -> new UserException(UserErrorCode.NOT_EXISTS_USER));

        if (passwordEncoder.matches(password, user.getPassword())) {
            GeneratedToken generatedToken = tokenService.generatedToken(user.getId());
            saveTokenToRedis(user.getId(), generatedToken.getAccessToken()); // Redis에 토큰 저장
            return new LoginResponse(generatedToken.getAccessToken(), user.getId(), user.getNickname(), user.getScore(), user.getRanking());
        }

        throw new AuthException(AuthErrorCode.NOT_EXISTS);
    }

    public void logout(String accessToken) {
        tokenService.removeToken(accessToken);
    }

    private void saveTokenToRedis(Long userId, String accessToken) {
        String key = "user:" + userId + ":token";
        redisTemplate.opsForValue().set(key, accessToken, 30, TimeUnit.MINUTES); // 토큰 만료 시간 설정 (예: 30분)
    }
}