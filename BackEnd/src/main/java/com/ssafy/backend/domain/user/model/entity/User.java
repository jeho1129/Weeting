package com.ssafy.backend.domain.user.model.entity;

import com.ssafy.backend.domain.user.model.dto.response.UserResponse;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Map;


@Entity
@Table(name="users")
@Getter
@Setter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "account", unique = true, nullable = false)
    private String account;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "nickname", unique = true, nullable = false)
    private String nickname;

    @Column(name = "score", nullable = false)
    private Long score;

    @Column(name = "ranking")
    private Long ranking;

    @Column(name = "created_at", nullable = false, updatable = false, insertable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime createAt;

    @Column(name = "updated_at", nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
    private LocalDateTime updateAt;

    @PrePersist
    public void setDefaultScore() {
        if (this.score == null) {
            this.score = 1000L;
        }
    }
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getUsername() {
        return account;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public UserResponse toResponse() {
        return UserResponse.builder()
                .id(this.id)
                .account(this.account)
                .nickname(this.nickname)
                .score(this.score)
                .ranking(this.ranking)
                .build();
    }

    public static User of(OAuth2User oAuth2User) {
        Map<String, Object> map = oAuth2User.getAttributes();
        User user = new User();
        String account = (String) map.get("account");
        String nickName = (String) map.get("nickName");
        Long score = (Long) map.get("score");
        Long ranking = (Long) map.get("ranking");

        if (account != null) user.setAccount(account);
        if (nickName != null) user.setNickname(nickName);
        if (score != null) user.setScore(score);
        if (ranking != null) user.setRanking(ranking);
        return user;
    }

    public static User from(UserResponse userResponse){
        return User.builder()
                .account(userResponse.getAccount())
                .nickname(userResponse.getNickname())
                .score(userResponse.getScore())
                .ranking(userResponse.getRanking())
                .build();
    }
}
