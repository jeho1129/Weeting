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
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class ChatRoomGameServiceImpl implements ChatRoomGameService {

    private final RedisTemplate<String, Object> redisTemplate;
    private final UserRepository userRepository;
    private final TaskScheduler taskScheduler;




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
        ChatRoomDto roomInfo2 = (ChatRoomDto) redisTemplate.opsForValue().get(key);
        ChatRoomDto.RoomStatus currentStatus = roomInfo2.getRoomStatus();
        if (currentStatus == ChatRoomDto.RoomStatus.waiting && roomInfo2.getRoomUsers().size() >= 4) {

            boolean allReady = roomInfo2.getRoomUsers().stream()
                    .skip(1)
                    .allMatch(ChatRoomUserInfo::getReady);
            if (allReady) {
                roomInfo2.setRoomStatus(ChatRoomDto.RoomStatus.allready);
            } else {
                roomInfo2.setRoomStatus(ChatRoomDto.RoomStatus.waiting);
            }

            // theme 할당
            Theme[] themes = Theme.values();
            Random random = new Random();
            Theme randomTheme = themes[random.nextInt(themes.length)];
            roomInfo2.setRoomTheme(randomTheme);

            redisTemplate.opsForValue().set(key, roomInfo2);
        }

        return !userReadyStatus;
    }


    @Override
    public synchronized String grilledChicken(String chatRoomId,
                                 User user) {
        String key = "chatRoom:" + chatRoomId;
        ChatRoomDto roomInfo = (ChatRoomDto) redisTemplate.opsForValue().get(key);

        if (roomInfo == null) {
            throw new IllegalStateException("채팅방 정보를 불러올 수 없습니다.");
        }

        for (ChatRoomUserInfo userInfo : roomInfo.getRoomUsers()) {
            if (userInfo.getId().equals(user.getId())) {
                userInfo.setIsAlive(LocalDateTime.now().toString());
                userInfo.setScore(0.0f);
                redisTemplate.opsForValue().set(key, roomInfo);
                return userInfo.getIsAlive();
            }
        }

        ChatRoomDto roomInfo2 = (ChatRoomDto) redisTemplate.opsForValue().get(key);
        int isAliveCnt = roomInfo2.getRoomUsers().size();
        for (ChatRoomUserInfo userInfo : roomInfo2.getRoomUsers()) {
            if (userInfo.getIsAlive().isEmpty()) {
                isAliveCnt -= 1;
            }
            if (isAliveCnt > 1) {
                isAliveCnt = roomInfo2.getRoomUsers().size();
            }
        }

        if (isAliveCnt <= 1) {
            for (ChatRoomUserInfo userInfo : roomInfo2.getRoomUsers()) {
                userInfo.setReady(false);
                userInfo.setWord("");
                userInfo.setScore(0.0F);
                userInfo.setIsAlive("");
            }

            roomInfo2.setRoomTheme(null);
            roomInfo2.setRoomForbiddenTime(null);
            roomInfo2.setRoomEndTime(null);
            roomInfo2.setRoomStatus(ChatRoomDto.RoomStatus.end);
            redisTemplate.opsForValue().set(key, roomInfo2);
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

        results.sort(Comparator.comparing((ChatRoomGameResultDto result) -> !result.getIsAlive().isEmpty())
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
        roomInfo.setRoomStatus(ChatRoomDto.RoomStatus.waiting);

        redisTemplate.opsForValue().set(key, roomInfo);
    }







    @Override
    public synchronized void forbiddenWordSetting(String chatRoomId,
                                       User user,
                                       String word) {
        String key = "chatRoom:" + chatRoomId;

        ChatRoomDto roomInfo = (ChatRoomDto) redisTemplate.opsForValue().get(key);

        if (roomInfo == null) {
            throw new IllegalStateException("채팅방 정보를 불러올 수 없습니다.");
        }

        List<ChatRoomUserInfo> users = roomInfo.getRoomUsers();

        // 유저 ID를 찾아 인덱스를 가져온다.
        int index = -1;
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

        ChatRoomUserInfo nextUser = users.get(nextIndex);
        nextUser.setWord(word);

        redisTemplate.opsForValue().set(key, roomInfo);

//        while (true) {
//            ChatRoomDto roomInfo = (ChatRoomDto) redisTemplate.opsForValue().get(key);
//            List<ChatRoomUserInfo> users = roomInfo.getRoomUsers();
//
//            // 유저 본인의 ID를 찾아 인덱스를 가져온다.
//            int index = -1;
//            for (int i = 0; i < users.size(); i++) {
//                if (users.get(i).getId().equals(user.getId())) {
//                    index = i;
//                    break;
//                }
//            }
//
//            ChatRoomUserInfo myUser = users.get(index);
//
//            if (myUser.getWord() != "") {
//                int nextIndex = (index + 1) % users.size();
//
//                ChatRoomUserInfo nextUser = users.get(nextIndex);
//                nextUser.setWord(word);
//
//                redisTemplate.opsForValue().set(key, roomInfo);
//                log.info("[" + user.getNickname() + "]가 [" + users.get(nextIndex).getNickname() + "]에게 금지어 할당 : " + word);
//                break;
//            } else {
//                Thread.sleep(100);
//            }
//        }

    }


    @Override
    public void themeSetting(String chatRoomId) {
        String key = "chatRoom:" + chatRoomId;
        ChatRoomDto roomInfo = (ChatRoomDto) redisTemplate.opsForValue().get(key);

        Theme[] themes = Theme.values();
        Random random = new Random();

        Theme randomTheme = themes[random.nextInt(themes.length)];

        roomInfo.setRoomTheme(randomTheme);

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


////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////



//    @Override
//    public void roomStatusModify(String key) {
//        key = "chatRoom:" + key;
//        ChatRoomDto roomInfo = (ChatRoomDto) redisTemplate.opsForValue().get(key);
//
//        if (roomInfo == null) {
//            throw new IllegalStateException("채팅방 정보를 불러올 수 없습니다 ㅠㅠ");
//        }
//
//        ChatRoomDto.RoomStatus currentStatus = roomInfo.getRoomStatus();
//
//        switch (currentStatus) {
//            case waiting:
//                waittingToAllready(key);
//                break;
//
//            case wordsetting:
//                wordsettingToWordfinish(key);
//                break;
//
//            case wordfinish:
//                wordfinishToStart(key);
//                break;
//
//            case start:
//                startToEnd(key);
//                break;
//
//            case end:
//                EndToWaitting(key);
//                break;
//
//            default:
//                throw new IllegalStateException("방 상태 변경 중 에러 발생 !");
//        }
//    }


    @Override
    public void gameStart(String chatRoomId) {
        String key = "chatRoom:" + chatRoomId;

        ChatRoomDto roomInfo = (ChatRoomDto) redisTemplate.opsForValue().get(key);
        if (roomInfo == null) {
            throw new IllegalStateException("채팅방 정보를 불러올 수 없습니다 ㅠㅠ");
        }


        if (roomInfo.getRoomStatus() == ChatRoomDto.RoomStatus.allready) {
            roomInfo.setRoomForbiddenTime(LocalDateTime.now().plusSeconds(15).toString());
            roomInfo.setRoomStatus(ChatRoomDto.RoomStatus.wordsetting);
            redisTemplate.opsForValue().set(key, roomInfo);


            // wordsetting -> wordfinish
            ChatRoomDto roomInfo2 = (ChatRoomDto) redisTemplate.opsForValue().get(key);
            if (roomInfo2.getRoomStatus() == ChatRoomDto.RoomStatus.wordsetting) {
                taskScheduler.schedule(() -> {

                    roomInfo2.setRoomStatus(ChatRoomDto.RoomStatus.wordfinish);
                    redisTemplate.opsForValue().set(key, roomInfo2);
                    // wordfinish -> start
                    ChatRoomDto roomInfo3 = (ChatRoomDto) redisTemplate.opsForValue().get(key);
                    if (roomInfo3.getRoomStatus() == ChatRoomDto.RoomStatus.wordfinish) {
                        taskScheduler.schedule(() -> {
                            ChatRoomDto roomInfo3Plus = (ChatRoomDto) redisTemplate.opsForValue().get(key);
                            roomInfo3Plus.setRoomEndTime(LocalDateTime.now().plusSeconds(120).toString());
                            roomInfo3Plus.setRoomStatus(ChatRoomDto.RoomStatus.start);
                            redisTemplate.opsForValue().set(key, roomInfo3Plus);

                            // start -> end
                            ChatRoomDto roomInfo4 = (ChatRoomDto) redisTemplate.opsForValue().get(key);
                            if (roomInfo4.getRoomStatus() == ChatRoomDto.RoomStatus.start) {
                                taskScheduler.schedule(() -> {
                                    for (ChatRoomUserInfo userInfo : roomInfo4.getRoomUsers()) {
                                        userInfo.setReady(false);
                                        userInfo.setWord("");
                                        userInfo.setScore(0.0F);
                                        userInfo.setIsAlive("");
                                    }

                                    roomInfo4.setRoomTheme(null);
                                    roomInfo4.setRoomForbiddenTime(null);
                                    roomInfo4.setRoomEndTime(null);
                                    roomInfo4.setRoomStatus(ChatRoomDto.RoomStatus.end);
                                    redisTemplate.opsForValue().set(key, roomInfo4);

                                    // end -> waiting
                                    ChatRoomDto roomInfo5 = (ChatRoomDto) redisTemplate.opsForValue().get(key);
                                    if (roomInfo5.getRoomStatus() == ChatRoomDto.RoomStatus.end) {
                                        taskScheduler.schedule(() -> {

                                            roomInfo5.setRoomStatus(ChatRoomDto.RoomStatus.waiting);
                                            redisTemplate.opsForValue().set(key, roomInfo5);
                                        }, new Date(System.currentTimeMillis() + 10000));  // [ms]
                                    }
                                }, new Date(System.currentTimeMillis() + 120000));  // [ms]
                            }
                        }, new Date(System.currentTimeMillis() + 10000));  // [ms]
                    }
                }, new Date(System.currentTimeMillis() + 15000));  // [ms]
            }
        }
    }


    @Override
    public void startToEnd(String chatRoomId) {
        String key = "chatRoom:" + chatRoomId;
        ChatRoomDto roomInfo = (ChatRoomDto) redisTemplate.opsForValue().get(key);
        roomInfo.setRoomStatus(ChatRoomDto.RoomStatus.end);
        redisTemplate.opsForValue().set(key, roomInfo);
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

            for (ChatRoomUserInfo userInfo : roomInfo.getRoomUsers()) {
                userInfo.setReady(false);
                userInfo.setWord("");
                userInfo.setScore(0.0F);
                userInfo.setIsAlive("");
            }

            roomInfo.setRoomTheme(null);
            roomInfo.setRoomForbiddenTime(null);
            roomInfo.setRoomEndTime(null);
            roomInfo.setRoomStatus(ChatRoomDto.RoomStatus.waiting);

            redisTemplate.opsForValue().set(key, roomInfo);
        }
    }




//    @Override
//    public void waitingToAllready(String key) {
//        ChatRoomDto roomInfo = (ChatRoomDto) redisTemplate.opsForValue().get(key);
//        ChatRoomDto.RoomStatus currentStatus = roomInfo.getRoomStatus();
//        if (currentStatus == ChatRoomDto.RoomStatus.waiting && roomInfo.getRoomUsers().size() >= 4) {
//
//            boolean allReady = roomInfo.getRoomUsers().stream()
//                    .skip(1)
//                    .allMatch(ChatRoomUserInfo::getReady);
//            if (allReady) {
//                roomInfo.setRoomStatus(ChatRoomDto.RoomStatus.allready);
//                redisTemplate.opsForValue().set(key, roomInfo);
//            }
//        }
//    }


//    @Override
//    public void wordsettingToWordfinish(String key) {
//        ChatRoomDto roomInfo = (ChatRoomDto) redisTemplate.opsForValue().get(key);
//        ChatRoomDto.RoomStatus currentStatus = roomInfo.getRoomStatus();
//
//        if (currentStatus == ChatRoomDto.RoomStatus.wordsetting) {
//            // 15초 후에 아래 로직 실행
//            taskScheduler.schedule(() -> {
//
//                roomInfo.setRoomStatus(ChatRoomDto.RoomStatus.wordfinish);
//                redisTemplate.opsForValue().set(key, roomInfo);
//
//            }, new Date(System.currentTimeMillis() + 15000));  // [ms]
//        }
//    }


//    @Override
//    public void wordfinishToStart(String key) {
//        ChatRoomDto roomInfo = (ChatRoomDto) redisTemplate.opsForValue().get(key);
//        ChatRoomDto.RoomStatus currentStatus = roomInfo.getRoomStatus();
//
//        if (currentStatus == ChatRoomDto.RoomStatus.wordfinish) {
//            // 10초 후에 아래 로직 실행
//            taskScheduler.schedule(() -> {
//                roomInfo.setRoomEndTime(LocalDateTime.now().plusSeconds(240).toString());
//                roomInfo.setRoomStatus(ChatRoomDto.RoomStatus.start);
//                redisTemplate.opsForValue().set(key, roomInfo);
//            }, new Date(System.currentTimeMillis() + 10000));  // [ms]
//        }
//
//    }


//    @Override
//    public void startToEnd(String key) {
//        ChatRoomDto roomInfo = (ChatRoomDto) redisTemplate.opsForValue().get(key);
//        ChatRoomDto.RoomStatus currentStatus = roomInfo.getRoomStatus();
//        List<ChatRoomUserInfo> users = roomInfo.getRoomUsers();
//
//        long aliveCount = users.stream()
//                .filter(user -> "true".equalsIgnoreCase(user.getIsAlive()))
//                .count();
//
//        if (currentStatus == ChatRoomDto.RoomStatus.start) {
//            // 1명을 제외하고 모두 사망했는지 확인
//            if (aliveCount <= 1) {
//                // 즉시 상태 변경
//                roomInfo.setRoomEndTime(LocalDateTime.now().toString());
//                roomInfo.setRoomStatus(ChatRoomDto.RoomStatus.end);
//                redisTemplate.opsForValue().set(key, roomInfo);
//            } else {
//                // 120초 후에 상태 변경
//                taskScheduler.schedule(() -> {
//
//                    roomInfo.setRoomStatus(ChatRoomDto.RoomStatus.end);
//                    redisTemplate.opsForValue().set(key, roomInfo);
//
//                }, new Date(System.currentTimeMillis() + 120000));  // [ms]
//            }
//        }
//    }


//    @Override
//    public void EndToWaitting(String key) {
//        ChatRoomDto roomInfo = (ChatRoomDto) redisTemplate.opsForValue().get(key);
//        ChatRoomDto.RoomStatus currentStatus = roomInfo.getRoomStatus();
//
//        if (currentStatus == ChatRoomDto.RoomStatus.end) {
//            // 10초 후에 아래 로직 실행
//            taskScheduler.schedule(() -> {
//                gameInitialize(key);
//            }, new Date(System.currentTimeMillis() + 10000));  // [ms]
//
//        }
//
//    }





}
