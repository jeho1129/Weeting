package com.ssafy.backend.domain.security.repository;


import com.ssafy.backend.domain.security.entity.UnsafeToken;
import org.springframework.data.repository.CrudRepository;

public interface UnsafeTokenRepository extends CrudRepository<UnsafeToken, String> {
}
