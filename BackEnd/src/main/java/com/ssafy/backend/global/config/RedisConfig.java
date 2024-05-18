package com.ssafy.backend.global.config;

import com.ssafy.backend.global.component.RedisKeyEventListener;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.RedisPassword;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.PatternTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.data.redis.listener.adapter.MessageListenerAdapter;
import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

/**
 * Redis 데이터 저장소 구성을 위한 설정 클래스입니다.
 */
@Configuration  // 설정 정보를 담고 있는 스프링 구성 클래스임을 나타낸다.
@EnableRedisRepositories  // 스프링 데이터 Redis 저장소를 활성화하여, Redis를 사용한 데이터 접근 레이어를 자동으로 구성할 수 있게 해준다.
public class RedisConfig {

    @Value("${spring.data.redis.host}")
    private String host;

    @Value("${spring.data.redis.port}")
    private int port;

    @Value("${spring.data.redis.password}")
    private String password;

    /**
     * Redis 연결을 관리하는 커넥션 팩토리 빈을 생성합니다.
     * host와 port를 사용해서 연결 팩토리를 생성한다.
     *
     * @return RedisConnectionFactory 레티스 연결 팩토리 인스턴스
     */
    @Bean
    public RedisConnectionFactory redisConnectionFactory() {
        RedisStandaloneConfiguration redisConfig = new RedisStandaloneConfiguration();
        redisConfig.setHostName(host);
        redisConfig.setPort(port);
        redisConfig.setPassword(RedisPassword.of(password));
        return new LettuceConnectionFactory(redisConfig);
    }


    /**
     * Redis 작업을 수행하기 위한 템플릿 빈을 설정합니다.
     * 이 템플릿은 키는 문자열, 값은 JSON 형태로 직렬화된 값을 사용합니다.
     *
     * @return RedisTemplate 문자열 키와 객체 값을 처리할 수 있는 레디스 템플릿
     */
    @Bean
    public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory factory) {
        RedisTemplate<String, Object> template = new RedisTemplate<>();
        template.setConnectionFactory(factory);
        template.setKeySerializer(new StringRedisSerializer());
        template.setValueSerializer(new GenericJackson2JsonRedisSerializer());
        return template;
    }




    @Bean
    RedisMessageListenerContainer container(RedisConnectionFactory connectionFactory, MessageListenerAdapter listenerAdapter) {
        RedisMessageListenerContainer container = new RedisMessageListenerContainer();
        container.setConnectionFactory(connectionFactory);
        // "__keyspace@0__:Chatroom:*" 패턴을 사용하여 특정 키의 변경 이벤트를 구독합니다.
        container.addMessageListener(listenerAdapter, new PatternTopic("__keyevent@0__:set"));
        return container;
    }

    @Bean
    MessageListenerAdapter listenerAdapter(RedisKeyEventListener listener) {
        return new MessageListenerAdapter(listener, "onMessage");
    }


}
