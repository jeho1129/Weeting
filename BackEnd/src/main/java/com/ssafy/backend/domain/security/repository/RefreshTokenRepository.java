package com.ssafy.backend.domain.security.repository;

import com.ssafy.backend.domain.security.entity.Token;
import org.springframework.data.repository.CrudRepository;

public interface RefreshTokenRepository extends CrudRepository<Token, Long> {
}
