package com.ssafy.backend.domain.chatroom.service;

import com.ssafy.backend.domain.chatroom.dto.ChatRoomGameResultDto;
import com.ssafy.backend.domain.user.model.entity.User;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.util.List;

@Service
public interface ChatRoomGameService {

    // 게임 시작
    void gameStart(String chatRoomId);

    // 게임 종료 (결과창 확인Btn)
    void gameEnd(String chatRoomId);

    // ready 상태 변경
    Boolean readyStatusTrans(String roomId,
                                      User user);

    // 죽었을 때 isAlive 값 수정
    String grilledChicken(String chatRoomId,
                        User user);

    // 게임 결과 반환
    List<ChatRoomGameResultDto> gameResult(String chatRoomId);

    // 게임 결과 초기화
    void gameInitialize(String chatRoomId);

    // 금지어 설정
    String forbiddenWordSetting(String chatRoomId,
                              User user,
                              String word);

    // 사용자 점수 변경
    void updatePlayerScore(Long userId,
                           int scoreAdjustment);

    // 등수에 따른 사용자 점수 측정
    int[] getScoreAdjustments(int numberOfPlayers);

    // 변경된 사용자 점수에 따른 전체 사용자 등수 업데이트
    void updateRankings();


}
