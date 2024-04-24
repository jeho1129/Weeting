package com.ssafy.backend.domain.redistest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RedisTestController {

    private final StringRedisTemplate stringRedisTemplate;

    public RedisTestController(StringRedisTemplate stringRedisTemplate) {
        this.stringRedisTemplate = stringRedisTemplate;
    }

    @GetMapping("/redis-test")
    public String testRedis() {
        String key = "testKey";
        String value = "Hello Redis!";

        // 데이터 저장
        ValueOperations<String, String> values = stringRedisTemplate.opsForValue();
        values.set(key, value);

        // 데이터 조회
        return values.get(key);
    }
}
