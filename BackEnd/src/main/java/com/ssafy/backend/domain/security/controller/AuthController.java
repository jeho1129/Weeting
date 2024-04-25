package com.ssafy.backend.domain.security.controller;

import com.ssafy.backend.domain.security.dto.LoginRequest;
import com.ssafy.backend.domain.security.dto.RefreshRequest;
import com.ssafy.backend.domain.security.service.AuthService;
import com.ssafy.backend.domain.user.model.entity.User;
import com.ssafy.backend.global.utils.MessageUtils;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("api/v1/user")
public class AuthController {
    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<MessageUtils> login(@Valid @RequestBody LoginRequest loginRequest){
        return ResponseEntity.ok().body(MessageUtils.success(authService.login(loginRequest.getAccount(), loginRequest.getPassword())));
    }

    @PostMapping("/logout")
    public ResponseEntity<MessageUtils> logout(@AuthenticationPrincipal User user){
        authService.logout(user);
        return ResponseEntity.ok().body(MessageUtils.success());
    }


}
