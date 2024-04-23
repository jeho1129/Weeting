package com.ssafy.backend.user.model.dto.request;

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.ssafy.backend.user.model.entity.User;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@JsonNaming(PropertyNamingStrategy.class)
public class UserRegistRequest {

    @Pattern(regexp = "^[A-Za-z0-9]", message = "유효한 아이디를 입력해주세요")
    @NotNull
    private String account;

    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[~!@#$%^&*()+|=])[A-Za-z\\d~!@#$%^&*()+|=]{8,20}$", message = "비밀번호는 8~20자 영문 대 소문자, 숫자, 특수문자를 사용하세요.")
    @NotNull
    private String password;

    @Pattern(regexp = "^(?=.*[a-zA-Z가-힣])[a-zA-Z가-힣]{1,5}$", message = "닉네임은 한글 기준 5글자 이내로 입력해주세요")
    @NotNull
    private String nickname;

    public User createUser(PasswordEncoder passwordEncoder){
        return User.builder()
                .account(this.getAccount())
                .password(passwordEncoder.encode(this.getPassword()))
                .nickname(this.getNickname())
                .build();
    }

}
