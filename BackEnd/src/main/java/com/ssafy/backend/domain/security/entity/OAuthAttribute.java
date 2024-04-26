package com.ssafy.backend.domain.security.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.security.AuthProvider;
import java.util.HashMap;
import java.util.Map;

@Getter
@ToString
@Builder
public class OAuthAttribute {

    private Map<String, Object> attributes;
    private String nameAttributesKey;
    private String account;
    private String nickName;
    private Long score;
    private Long ranking;
    private AuthProvider provider;

    public Map<String, Object> convertToMap() {
        Map<String, Object> map = new HashMap<>();
        map.put("id", nameAttributesKey);
        map.put("key", nameAttributesKey);
        map.put("nickName",nickName);
        map.put("score",score);
        map.put("ranking", ranking);
        map.put("account", account);
        map.put("provider", provider);
        return map;
    }


}

