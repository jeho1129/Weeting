package com.ssafy.backend.domain.chat.repository;

import com.ssafy.backend.domain.chat.document.Chat;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface ChatRepository extends MongoRepository<Chat, Long> {

}
