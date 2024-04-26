package com.ssafy.backend.domain.security.utils;

import com.ssafy.backend.domain.security.config.JwtProperties;
import com.ssafy.backend.domain.security.exception.JwtErrorCode;
import com.ssafy.backend.domain.security.repository.UnsafeTokenRepository;
import com.ssafy.backend.domain.security.exception.JwtException;
import io.jsonwebtoken.*;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import java.time.Duration;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Base64;
import java.util.Date;


@Slf4j
@Service
@RequiredArgsConstructor
public class JwtUtils {

    private final JwtProperties jwtProperties;
    private static final ZoneId zoneId = ZoneId.of("Asia/Seoul");
    private String accessSecretKey;


    private final UnsafeTokenRepository unsafeTokenRepository;
    @PostConstruct
    protected void init(){
        accessSecretKey = Base64.getEncoder().encodeToString(
                jwtProperties.getAccess().getBytes()
        );
    }

    //토큰발행시간
    public Date getIssuedAt(){
        return Date.from(ZonedDateTime.now(zoneId).toInstant());
    }
    //토큰만료시간
    public Date getExpiredTime(Long period){
        log.info("기간={}",period);
        return Date.from(ZonedDateTime.now(zoneId).plus(Duration.ofMillis(period)).toInstant());
    }


    //엑세스 토큰 생성
    public String generateAccessToken(Long id){
        Long accessTime = jwtProperties.getAccessTime();
        log.info("토큰생성={}", id);
        return Jwts.builder()
                .setSubject(String.valueOf(id))
                .setIssuedAt(getIssuedAt())
                .setExpiration(getExpiredTime(accessTime))
                .signWith(SignatureAlgorithm.HS256, accessSecretKey)
                .compact();
    }


    /**
     * 엑세스 토큰 검증
     */
    public Jws<Claims> validateAccessToken(final String token){

        try{
            Jws<Claims> claimsJws = Jwts.parser().setSigningKey(accessSecretKey).parseClaimsJws(token);
            unsafeTokenRepository.findById(token).ifPresent(value -> {
                throw new JwtException(JwtErrorCode.TOKEN_SIGNATURE_ERROR);
            });
            return claimsJws;

        }catch ( MalformedJwtException e){
            log.info("exception : 잘못된 엑세스 토큰 시그니처");
            throw new JwtException(JwtErrorCode.TOKEN_SIGNATURE_ERROR, e.getMessage());
        }catch (ExpiredJwtException e){
            log.info("exception : 엑세스 토큰 기간 만료");
            throw new JwtException(JwtErrorCode.EXPIRED_TOKEN, e.getMessage());
        }catch (UnsupportedJwtException e){
            log.info("exception : 지원되지 않는 엑세스 토큰");
            throw new JwtException(JwtErrorCode.NOT_SUPPORT_TOKEN, e.getMessage());
        }catch (IllegalArgumentException e){
            log.info("exception : 잘못된 엑세스 토큰");
            throw new JwtException(JwtErrorCode.INVALID_TOKEN, e.getMessage());
        }
    }


    public Long getUserIdByAccessToken(String accessToken){
        return Long.valueOf(
                validateAccessToken(accessToken).getBody().getSubject()
        );
    }


}
