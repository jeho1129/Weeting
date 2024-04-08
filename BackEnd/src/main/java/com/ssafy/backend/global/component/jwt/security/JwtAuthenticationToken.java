package com.ssafy.backend.global.component.jwt.security;

import lombok.Getter;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

@Getter
public class JwtAuthenticationToken extends AbstractAuthenticationToken {
    private final MemberLoginActiveRecord principal;
    private final Object credentials;

    public JwtAuthenticationToken(MemberLoginActiveRecord principal, Object credentials, Collection<? extends GrantedAuthority> authorities) {
        super(authorities);
        this.principal = principal;
        this.credentials = credentials;
        super.setAuthenticated(true); // 고려사항: 인증 상태를 외부에서 설정할 수 있도록 변경
    }

    @Override
    public Object getCredentials() {
        return this.credentials;
    }

    @Override
    public Object getPrincipal() {
        return this.principal;
    }

}
