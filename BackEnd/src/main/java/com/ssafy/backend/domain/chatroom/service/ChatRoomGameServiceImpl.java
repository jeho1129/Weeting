package com.ssafy.backend.domain.chatroom.service;

import com.ssafy.backend.domain.chatroom.dto.ChatRoomDto;
import com.ssafy.backend.domain.chatroom.dto.ChatRoomGameResultDto;
import com.ssafy.backend.domain.chatroom.dto.ChatRoomUserInfo;
import com.ssafy.backend.domain.user.exception.UserErrorCode;
import com.ssafy.backend.domain.user.exception.UserException;
import com.ssafy.backend.domain.user.model.entity.User;
import com.ssafy.backend.domain.user.model.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class ChatRoomGameServiceImpl implements ChatRoomGameService {

    private final RedisTemplate<String, Object> redisTemplate;
    private final UserRepository userRepository;
    private ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(10); // 스레드 풀 크기 설정


    private void scheduleTask(String chatRoomId, ChatRoomDto.RoomStatus newStatus, long delay, TimeUnit unit) {
        scheduler.schedule(() -> {
            String key = "chatRoom:" + chatRoomId;
            ChatRoomDto roomInfo = (ChatRoomDto) redisTemplate.opsForValue().get(key);
            if (roomInfo != null) {
                roomInfo.setRoomStatus(newStatus);
                redisTemplate.opsForValue().set(key, roomInfo);
            }
        }, delay, unit);
    }


    @Override
    public LocalTime roomStatusModify(String chatRoomId) {
        String key = "chatRoom:" + chatRoomId;

        ChatRoomDto roomInfo = (ChatRoomDto) redisTemplate.opsForValue().get(key);

        if (roomInfo == null) {
            throw new IllegalStateException("채팅방 정보를 불러올 수 없습니다 ㅠㅠ");
        }

        ChatRoomDto.RoomStatus currentStatus = roomInfo.getRoomStatus();
        LocalTime currentTime = LocalTime.now();
        LocalTime futureTime = null;

        switch (currentStatus) {
            case waiting:
                roomInfo.setRoomStatus(ChatRoomDto.RoomStatus.allready);
                break;
            case allready:
                roomInfo.setRoomStatus(ChatRoomDto.RoomStatus.wordsetting);
                break;
            case wordsetting:
                roomInfo.setRoomStatus(ChatRoomDto.RoomStatus.wordfinish);
                futureTime = currentTime.plusSeconds(30);
                break;
            case wordfinish:
                roomInfo.setRoomStatus(ChatRoomDto.RoomStatus.start);
                break;
            case start:
                roomInfo.setRoomStatus(ChatRoomDto.RoomStatus.end);
                futureTime = currentTime.plusSeconds(240);
                break;
            case end:
                roomInfo.setRoomStatus(ChatRoomDto.RoomStatus.waiting);
                break;
            default:
                throw new IllegalStateException("방 상태 변경 중 에러 발생 !");
        }

        redisTemplate.opsForValue().set(key, roomInfo);
        if (currentStatus == ChatRoomDto.RoomStatus.wordsetting || currentStatus == ChatRoomDto.RoomStatus.start) {
            return futureTime;
        } else {
            return currentTime;
        }
    }


    @Override
    public void readyStatusTrans(String chatRoomId,
                                 User user) {
        String key = "chatRoom:" + chatRoomId;

        ChatRoomDto roomInfo = (ChatRoomDto) redisTemplate.opsForValue().get(key);
        if (roomInfo == null) {
            throw new IllegalStateException("채팅방 정보를 불러올 수 없습니다 ㅠㅠ");
        }

        for (ChatRoomUserInfo userInfo : roomInfo.getRoomUsers()) {
            if (userInfo.getId().equals(user.getId())) {
                Boolean userReadyStatus = userInfo.getReady();

                userInfo.setReady(!userReadyStatus);

                redisTemplate.opsForValue().set(key, roomInfo);

                break;
            }
        }
    }


    @Override
    public List<ChatRoomGameResultDto> gameResult(String chatRoomId) {
        String key = "chatRoom:" + chatRoomId;

        ChatRoomDto roomInfo = (ChatRoomDto) redisTemplate.opsForValue().get(key);

        if (roomInfo == null) {
            throw new IllegalStateException("채팅방 정보를 불러올 수 없습니다.");
        }

        List<ChatRoomGameResultDto> results = new ArrayList<>();

        for (ChatRoomUserInfo userInfo : roomInfo.getRoomUsers()) {
            redisTemplate.delete("similar:" + userInfo.getNickname());
            redisTemplate.delete("forbidden:" + userInfo.getNickname());

            ChatRoomGameResultDto resultDto = ChatRoomGameResultDto.builder()
                    .id(userInfo.getId())
                    .nickname(userInfo.getNickname())
                    .score(userInfo.getScore())
                    .isAlive(userInfo.getIsAlive())
                    .build();
            results.add(resultDto);
        }

        results.sort(Comparator.comparing(ChatRoomGameResultDto::getIsAlive).reversed()
                .thenComparing(Comparator.comparing(ChatRoomGameResultDto::getScore).reversed()));

        int[] scoreAdjustments = getScoreAdjustments(results.size());
        for (int i = 0; i < results.size(); i++) {
            ChatRoomGameResultDto result = results.get(i);
            updatePlayerScore(result.getId(), scoreAdjustments[i]);
        }

        return results;
    }


    @Override
    public void gameInitialize(String chatRoomId) {
        String key = "chatRoom:" + chatRoomId;

        ChatRoomDto roomInfo = (ChatRoomDto) redisTemplate.opsForValue().get(key);

        if (roomInfo == null) {
            throw new IllegalStateException("채팅방 정보를 불러올 수 없습니다.");
        }

        for (ChatRoomUserInfo userInfo : roomInfo.getRoomUsers()) {
            userInfo.setReady(false);
            userInfo.setWord("");
            userInfo.setScore(0.0F);
            userInfo.setIsAlive(true);
        }

        redisTemplate.opsForValue().set(key, roomInfo);
    }


    @Override
    public void updatePlayerScore(Long userId, int scoreAdjustment) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserException(UserErrorCode.NOT_EXISTS_USER));
        int newScore = user.getScore() + scoreAdjustment;
        user.setScore(newScore);
        userRepository.save(user);
        updateRankings();
    }


    @Override
    public int[] getScoreAdjustments(int numberOfPlayers) {
        int[] scoreAdjustments = new int[numberOfPlayers];
        for (int i = 0; i < numberOfPlayers; i++) {
            scoreAdjustments[i] = (numberOfPlayers - 1) - (2 * i);
        }
        return scoreAdjustments;
    }


    @Override
    public void updateRankings() {
        List<User> allUsers = userRepository.findAll(Sort.by(Sort.Direction.DESC, "score"));
        int currentRank = 1;
        int usersAtThisRank = 0;
        int lastScore = Integer.MIN_VALUE;

        for (User user : allUsers) {
            if (user.getScore() != lastScore) {
                currentRank += usersAtThisRank;
                usersAtThisRank = 0;
            }
            user.setRanking(currentRank);
            lastScore = user.getScore();
            usersAtThisRank++;
        }
        userRepository.saveAll(allUsers);
    }


    public void forbiddenWordSetting(String chatRoomId, User user) {

    }
}
