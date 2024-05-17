package com.ssafy.backend.domain.chatroom.service;

import com.ssafy.backend.domain.chatroom.dto.ChatRoomDto;
import com.ssafy.backend.domain.chatroom.dto.ChatRoomGameResultDto;
import com.ssafy.backend.domain.chatroom.dto.ChatRoomUserInfo;
import com.ssafy.backend.domain.chatroom.entity.Theme;
import com.ssafy.backend.domain.user.exception.UserErrorCode;
import com.ssafy.backend.domain.user.exception.UserException;
import com.ssafy.backend.domain.user.model.entity.User;
import com.ssafy.backend.domain.user.model.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

import static com.ssafy.backend.domain.chatroom.entity.Word.getRandomForbiddenWord;

@Service
@RequiredArgsConstructor
public class ChatRoomGameServiceImpl implements ChatRoomGameService {

    private final RedisTemplate<String, Object> redisTemplate;
    private final UserRepository userRepository;
    private final TaskScheduler taskScheduler;

    @Scheduled(fixedRate = 300)
    public void scheduleRoomStatusModify() {
        Set<String> chatRoomIds = redisTemplate.keys("chatRoom:*");
        for (String chatRoomId : chatRoomIds) {
            roomStatusModify(chatRoomId);
        }
    }


    @Override
    public void roomStatusModify(String chatRoomId) {
        String key = "chatRoom:" + chatRoomId;

        ChatRoomDto roomInfo = (ChatRoomDto) redisTemplate.opsForValue().get(key);

        if (roomInfo == null) {
            throw new IllegalStateException("채팅방 정보를 불러올 수 없습니다 ㅠㅠ");
        }

        ChatRoomDto.RoomStatus currentStatus = roomInfo.getRoomStatus();


        switch (currentStatus) {
            case waiting:
                ChatRoomDto currentRoomInfo1 = (ChatRoomDto) redisTemplate.opsForValue().get(key);

                boolean allReady = currentRoomInfo1.getRoomUsers().stream()
                        .skip(1)
                        .allMatch(ChatRoomUserInfo::getReady);

                if (allReady) {
                    currentRoomInfo1.setRoomStatus(ChatRoomDto.RoomStatus.allready);
                    redisTemplate.opsForValue().set(key, currentRoomInfo1);
                }

                break;

            case wordsetting:
                ChatRoomDto currentRoomInfo2 = (ChatRoomDto) redisTemplate.opsForValue().get(key);

                if (currentRoomInfo2.getRoomStatusFlag() == false) {
                    currentRoomInfo2.setRoomStatusFlag(true);
                    redisTemplate.opsForValue().set(key, currentRoomInfo2);

                    // 15초 후에 아래 로직 실행
                    taskScheduler.schedule(() -> {

                        currentRoomInfo2.setRoomStatus(ChatRoomDto.RoomStatus.wordfinish);
                        currentRoomInfo2.setRoomStatusFlag(false);
                        redisTemplate.opsForValue().set(key, currentRoomInfo2);

                    }, new Date(System.currentTimeMillis() + 15000));  // [ms]
                }

                break;

            case wordfinish:
                ChatRoomDto currentRoomInfo3 = (ChatRoomDto) redisTemplate.opsForValue().get(key);

                if (currentRoomInfo3.getRoomStatusFlag() == false) {
                    currentRoomInfo3.setRoomStatusFlag(true);
                    redisTemplate.opsForValue().set(key, currentRoomInfo3);

                    // 10초 후에 아래 로직 실행
                    taskScheduler.schedule(() -> {

                        Theme[] themes = Theme.values();
                        Theme randomTheme = themes[new Random().nextInt(themes.length)];
                        currentRoomInfo3.setRoomTheme(randomTheme);

                        currentRoomInfo3.setRoomEndTime(LocalDateTime.now().plusSeconds(240).toString());

                        currentRoomInfo3.setRoomStatus(ChatRoomDto.RoomStatus.start);
                        currentRoomInfo3.setRoomStatusFlag(false);
                        redisTemplate.opsForValue().set(key, currentRoomInfo3);

                    }, new Date(System.currentTimeMillis() + 10000));  // [ms]
                }

                break;

            case start:
                ChatRoomDto currentRoomInfo4 = (ChatRoomDto) redisTemplate.opsForValue().get(key);
                List<ChatRoomUserInfo> users = currentRoomInfo4.getRoomUsers();

                long aliveCount = users.stream()
                        .filter(user -> "true".equalsIgnoreCase(user.getIsAlive()))
                        .count();



                // 1명을 제외하고 모두 사망했는지 확인
                if (aliveCount <= 1) {
                    // 즉시 상태 변경
                    currentRoomInfo4.setRoomEndTime(LocalDateTime.now().toString());

                    currentRoomInfo4.setRoomStatus(ChatRoomDto.RoomStatus.end);
                    redisTemplate.opsForValue().set(key, currentRoomInfo4);
                } else {
                    if (currentRoomInfo4.getRoomStatusFlag() == false) {
                        currentRoomInfo4.setRoomStatusFlag(true);
                        redisTemplate.opsForValue().set(key, currentRoomInfo4);

                        // 120초 후에 상태 변경
                        taskScheduler.schedule(() -> {

                                currentRoomInfo4.setRoomStatus(ChatRoomDto.RoomStatus.end);
                                currentRoomInfo4.setRoomStatusFlag(false);
                                redisTemplate.opsForValue().set(key, currentRoomInfo4);

                        }, new Date(System.currentTimeMillis() + 120000));  // [ms]
                    }
                }

                break;

            case end:
                ChatRoomDto currentRoomInfo5 = (ChatRoomDto) redisTemplate.opsForValue().get(key);

                if (currentRoomInfo5.getRoomStatusFlag() == false) {
                    currentRoomInfo5.setRoomStatusFlag(true);
                    redisTemplate.opsForValue().set(key, currentRoomInfo5);
                    // 10초 후에 아래 로직 실행
                    taskScheduler.schedule(() -> {

                        gameInitialize(chatRoomId);

                        currentRoomInfo5.setRoomStatus(ChatRoomDto.RoomStatus.waiting);
                        currentRoomInfo5.setRoomStatusFlag(false);
                        redisTemplate.opsForValue().set(key, currentRoomInfo5);
                    }, new Date(System.currentTimeMillis() + 10000));  // [ms]

                }

                break;

            default:
                throw new IllegalStateException("방 상태 변경 중 에러 발생 !");
        }

    }
///////////////////////////////////////////////////////////////////////////////////////////////////////////

    @Override
    public void gameStart(String chatRoomId) {
        String key = "chatRoom:" + chatRoomId;

        ChatRoomDto roomInfo = (ChatRoomDto) redisTemplate.opsForValue().get(key);
        if (roomInfo == null) {
            throw new IllegalStateException("채팅방 정보를 불러올 수 없습니다 ㅠㅠ");
        }

        ChatRoomDto.RoomStatus currentStatus = roomInfo.getRoomStatus();

        if (currentStatus == ChatRoomDto.RoomStatus.allready) {
            roomInfo.setRoomForbiddenTime(LocalDateTime.now().plusSeconds(30).toString());
            roomInfo.setRoomStatus(ChatRoomDto.RoomStatus.wordsetting);
            redisTemplate.opsForValue().set(key, roomInfo);
        }
    }

    @Override
    public void gameEnd(String chatRoomId) {
        String key = "chatRoom:" + chatRoomId;

        ChatRoomDto roomInfo = (ChatRoomDto) redisTemplate.opsForValue().get(key);
        if (roomInfo == null) {
            throw new IllegalStateException("채팅방 정보를 불러올 수 없습니다 ㅠㅠ");
        }

        ChatRoomDto.RoomStatus currentStatus = roomInfo.getRoomStatus();

        if (currentStatus == ChatRoomDto.RoomStatus.end) {
            roomInfo.setRoomStatus(ChatRoomDto.RoomStatus.waiting);
            gameInitialize(chatRoomId);
            redisTemplate.opsForValue().set(key, roomInfo);
        }
    }


    @Override
    public Boolean readyStatusTrans(String chatRoomId,
                                 User user) {
        String key = "chatRoom:" + chatRoomId;

        ChatRoomDto roomInfo = (ChatRoomDto) redisTemplate.opsForValue().get(key);
        if (roomInfo == null) {
            throw new IllegalStateException("채팅방 정보를 불러올 수 없습니다 ㅠㅠ");
        }

        Boolean userReadyStatus = null;

        for (ChatRoomUserInfo userInfo : roomInfo.getRoomUsers()) {
            if (userInfo.getId().equals(user.getId())) {
                userReadyStatus = userInfo.getReady();

                userInfo.setReady(!userReadyStatus);

                redisTemplate.opsForValue().set(key, roomInfo);

                break;
            }
        }

        return !userReadyStatus;
    }


    @Override
    public String grilledChicken(String chatRoomId,
                               User user) {
        String key = "chatRoom:" + chatRoomId;
        ChatRoomDto roomInfo = (ChatRoomDto) redisTemplate.opsForValue().get(key);

        if (roomInfo == null) {
            throw new IllegalStateException("채팅방 정보를 불러올 수 없습니다.");
        }

        for (ChatRoomUserInfo userInfo : roomInfo.getRoomUsers()) {
            if (userInfo.getId().equals(user.getId())) {
                userInfo.setIsAlive(LocalDateTime.now().toString());
                redisTemplate.opsForValue().set(key, roomInfo);
                return userInfo.getIsAlive();
            }
        }

        return "";
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
            userInfo.setIsAlive("");
        }

        roomInfo.setRoomTheme(null);
        roomInfo.setRoomForbiddenTime(null);
        roomInfo.setRoomEndTime(null);

        redisTemplate.opsForValue().set(key, roomInfo);
    }







    @Override
    public String forbiddenWordSetting(String chatRoomId,
                                     User user,
                                     String word) {
        String key = "chatRoom:" + chatRoomId;
        ChatRoomDto roomInfo = (ChatRoomDto) redisTemplate.opsForValue().get(key);

        if (roomInfo == null) {
            throw new IllegalStateException("채팅방 정보를 불러올 수 없습니다.");
        }

        List<ChatRoomUserInfo> users = roomInfo.getRoomUsers();
        int index = -1;

        // 유저 ID를 찾아 인덱스를 가져온다.
        for (int i = 0; i < users.size(); i++) {
            if (users.get(i).getId().equals(user.getId())) {
                index = i;
                break;
            }
        }

        if (index == -1) {
            throw new IllegalStateException("유저가 채팅방에 존재하지 않습니다.");
        }

        // 타유저에게 금칙어 할당
        int nextIndex = (index + 1) % users.size();

        if (word.isEmpty()) {
            word = getRandomForbiddenWord();
        }

        users.get(nextIndex).setWord(word);


        redisTemplate.opsForValue().set(key, roomInfo);

        return "[" + users.get(nextIndex).getNickname() + "]에게 금지어 할당 : " + word;

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


}
