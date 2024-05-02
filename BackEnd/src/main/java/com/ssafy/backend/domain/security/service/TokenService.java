package com.ssafy.backend.domain.security.service;

import com.ssafy.backend.domain.security.dto.GeneratedToken;
import com.ssafy.backend.domain.security.entity.Token;
import com.ssafy.backend.domain.security.entity.UnsafeToken;
import com.ssafy.backend.domain.security.exception.JwtErrorCode;
import com.ssafy.backend.domain.security.exception.JwtException;
import com.ssafy.backend.domain.security.repository.RefreshTokenRepository;
import com.ssafy.backend.domain.security.repository.UnsafeTokenRepository;
import com.ssafy.backend.domain.security.utils.JwtUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class TokenService {

    private final JwtUtils jwtUtils;
    private final UnsafeTokenRepository unsafeTokenRepository;

    public GeneratedToken generatedToken(Long id){
        String accessToken = jwtUtils.generateAccessToken(id);
        return new GeneratedToken(accessToken);
    }

    public void removeToken(String accessToken) {

        // AccessToken 블랙리스트에 추가
        UnsafeToken unsafeToken = new UnsafeToken(accessToken);
        unsafeTokenRepository.save(unsafeToken);
    }


}
