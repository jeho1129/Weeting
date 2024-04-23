package com.ssafy.backend.user.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.bridge.MessageUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/users")
@RequiredArgsConstructor
@Slf4j
public class UserController {
    @GetMapping("/dummy")
    public String dummy() {
        return "{}";
    }

    @PostMapping("/regist")
    public ResponseEntity<MessageUtil> register(@Valid @RequestBody UserRegistRequest UserRegistRequest) {
        log.debug("UserRegistRequest={}", UserRegistRequest.toString());
    }

}
