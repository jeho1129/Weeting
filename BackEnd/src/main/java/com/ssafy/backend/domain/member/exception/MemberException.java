package com.ssafy.backend.domain.member.exception;

import lombok.Getter;

@Getter
public class MemberException extends RuntimeException {
    private final MemberErrorCode errorCode;
    private final int status;
    private final String errorMessage;

    public MemberException(MemberErrorCode errorCode) {
        super(errorCode.getErrorMessage());
        this.errorCode = errorCode;
        this.status = errorCode.getHttpStatus().value();
        this.errorMessage = errorCode.getErrorMessage();
    }
}
