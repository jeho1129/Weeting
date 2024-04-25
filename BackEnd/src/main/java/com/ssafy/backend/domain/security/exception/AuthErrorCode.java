package com.ssafy.backend.domain.security.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;


import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.UNAUTHORIZED;

@Getter
@AllArgsConstructor
public enum AuthErrorCode {
    NOT_EXISTS("유효하지 않은 정보입니다.", UNAUTHORIZED),
    ALREADY_JOIN_ACCOUNT("이미 가입된 아이디입니다.", BAD_REQUEST);


    private final String message;
    private final HttpStatus httpStatus;
}
