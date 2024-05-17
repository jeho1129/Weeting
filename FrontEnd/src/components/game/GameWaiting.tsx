import styles from '@/styles/game/GameWaiting.module.css';

import { useState, useEffect } from 'react';

import { useRecoilValue, useSetRecoilState } from 'recoil';
import { gameState, userState } from '@/recoil/atom';

import { IngameUser } from '@/types/user';
import { RoomInfo, MessageScore } from '@/types/game';

import { forbiddenWordSettingApi, forbiddenWordSettingDataApi, gameOverApi } from '@/services/gameApi';
import { randomForbbidenWord } from '@/utils/randomForbiddenWord';

import GameForbiddenWord from '@/components/game/GameWordModal';
import GameRankModal from '@/components/game/GameRankModal';
import GameWaitingLeftSide from '@/components/game/GameWaitingLeftSide';
import GameWaitingRightSide from '@/components/game/GameWaitingRightSide';
import GameLoading from '@/components/game/GameLoading';
import { useParams } from 'react-router-dom';

const GameWaiting = () => {
  const userInfo = useRecoilValue(userState);
  const gameInfo = useRecoilValue(gameState);
  const setGameInfoRecoil = useSetRecoilState(gameState);
  const [gameStartLoading, setGameStartLoading] = useState(false);
  const [messageScore, setMessageScore] = useState<MessageScore>({
    nickname: userInfo.nickname,
    highest_similarity: 0,
  });
  const [webSocketScore, setWebSocketScore] = useState<WebSocket | null>(null);

  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [isRankOpen, setRankOpen] = useState<boolean>(false);
  const [forbiddenWord, setForbiddenWord] = useState<string>('');

  const [roomInfo, setRoomInfo] = useState<RoomInfo>({
    roomMode: gameInfo.roomMode,
    roomId: useParams().id!,
    roomName: gameInfo.roomName,
    roomStatus: gameInfo.roomStatus,
    roomForbiddenTime: gameInfo.roomForbiddenTime,
    roomEndTime: gameInfo.roomEndTime,
    roomTheme: gameInfo.roomTheme,
    roomMaxCnt: gameInfo.roomMaxCnt,
    roomUsers: gameInfo.roomUsers,
  });

  const [ingameUserInfo, setIngameUserInfo] = useState<IngameUser>({
    id: userInfo.userId,
    nickname: userInfo.nickname,
    ready: false,
    word: null,
    score: 0,
    isAlive: '',
  });
  const [myIndex, setMyIndex] = useState<number>(0);

  // roomInfo 웹소켓 연결
  useEffect(() => {
    // local 개발용
    // const ws = new WebSocket('ws://localhost:8080/ws/chatroom/get');
    // 배포용
    // const ws = new WebSocket('wss://3.36.58.63/ws');
    const ws = new WebSocket('wss://k10c103.p.ssafy.io/ws/chatroom/get');
    ws.onopen = () => {
      // console.log('웹소크ㅔ세에엣연결성고오오옹');
      ws.send(JSON.stringify({ roomId: roomInfo.roomId }));
    };

    ws.onmessage = (event) => {
      const roominfo = JSON.parse(event.data);
      // console.log('받은 방 정보:', roominfo);
      setRoomInfo(roominfo);
      setIngameUserInfo(roomInfo.roomUsers.filter((user) => user.id === userInfo.userId)[0]);
      setMyIndex(roomInfo.roomUsers.findIndex((user) => user.id === userInfo.userId));
    };

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [roomInfo]);

  // roomInfo가 변경되면 recoil에 반영
  useEffect(() => {
    setGameInfoRecoil(roomInfo);
    localStorage.setItem('roomInfo', JSON.stringify(roomInfo));
  }, [roomInfo]);

  // roomStatus
  useEffect(() => {
    // wordsetting에서 해야하는 일
    // 금지어 설정 모달창 띄우기
    if (roomInfo.roomStatus === 'wordsetting' && forbiddenWord === '') {
      setModalOpen(true);
    }
    // wordfinish에서 해야하는 일
    // 금지어 설정 모달창 닫기
    // 금지어 보내기
    // 만약 금지어가 없다면 죽이기
    // 10초간 loading창 보여주기
    else if (roomInfo.roomStatus === 'wordfinish') {
      if (isModalOpen === true) {
        setModalOpen(false);
      }
      if (forbiddenWord === '') {
        const randomWord = randomForbbidenWord(roomInfo.roomTheme);
        // 지금 유저가 금칙어를 입력해줘야하는 사람에게 임의의 값 지정
        gameOverApi(roomInfo.roomId);
        forbiddenWordSettingApi({ roomId: roomInfo.roomId, forbiddenWord: randomWord });
        forbiddenWordSettingDataApi({
          nickname:
            myIndex !== roomInfo.roomUsers.length - 1
              ? roomInfo.roomUsers[myIndex + 1].nickname
              : roomInfo.roomUsers[0].nickname,
          forbiddenWord: randomWord,
        });
      } else {
        forbiddenWordSettingApi({ roomId: roomInfo.roomId, forbiddenWord: forbiddenWord });
        forbiddenWordSettingDataApi({
          nickname:
            myIndex !== roomInfo.roomUsers.length - 1
              ? roomInfo.roomUsers[myIndex + 1].nickname
              : roomInfo.roomUsers[0].nickname,
          forbiddenWord: forbiddenWord,
        });
      }

      setGameStartLoading(true);
      setTimeout(() => {
        setGameStartLoading(false);
      }, 10000);
    }
    // wordfinish에서 해야하는 일
    // 점수 확인 웹소켓 연결
    // 가장 높은 점수일 때 roomInfo Users에 score 업데이트
    else if (roomInfo.roomStatus === 'start') {
      // local용
      // const ws = new WebSocket('ws://localhost:8000/ws');
      // 배포용
      const ws = new WebSocket('wss://k10c103.p.ssafy.io/ws');
      // const ws = new WebSocket('wss://k10c103.p.ssafy.io/ws');

      ws.onopen = () => {
        // console.log('-----지호지호웹소캣가즈아--------');
      };
      ws.onmessage = (response) => {
        // console.log(response.data);
        const score: { nickname: string; highest_similarity: number } = JSON.parse(response.data);
        setMessageScore({
          nickname: score.nickname,
          highest_similarity: score.highest_similarity,
        });
        // 만약 가장 높은 점수라면
        if (roomInfo.roomUsers.filter((user) => user.id === userInfo.userId)[0].score < score.highest_similarity) {
          //게임 정보변경 (내 score값 변경)
          //.send 뭐... 어쩌구저쩌구....
        }
      };
      ws.onerror = (error) => {
        console.error('웹소켓 에러 발생:', error);
      };

      setWebSocketScore(ws);

      return () => {
        if (ws) {
          ws.close();
        }
      };
    }
    // end 일 때 할 일
    // 게임 종료 모달 오픈
    else if (roomInfo.roomStatus === 'end') {
      setRankOpen(true);
    }
    // waiting일 때 할 일
    // 게임종료 모달창 닫기
    // 게임이 끝난 경우 프론트에 저장된 값 지우기
    else if (roomInfo.roomStatus === 'waiting') {
      if (isRankOpen) {
        setRankOpen(false);
      }
      setMessageScore({ nickname: userInfo.nickname, highest_similarity: 0 });
      setWebSocketScore(null);
      setForbiddenWord('');
    }
  }, [roomInfo.roomStatus]);

  return (
    <>
      {/* 모달 창 열기 */}
      {(isRankOpen || isModalOpen) && (
        <div
          className={styles.modalOpenBackground}
          onClick={() => {
            if (isRankOpen) {
              setRankOpen(false);
            }
          }}
        ></div>
      )}

      <div className={`FontM20 ${styles.SpaceEvenly}`}>
        <GameWaitingLeftSide roomInfo={roomInfo} messageScore={messageScore} />
        <GameWaitingRightSide {...{ roomInfo, ingameUserInfo, webSocketScore }} />
      </div>

      {gameStartLoading && <GameLoading />}

      {isModalOpen && (
        <GameForbiddenWord
          roomInfo={roomInfo}
          myIndex={myIndex}
          isModalOpen={isModalOpen}
          setModalOpen={setModalOpen}
          forbiddenWord={forbiddenWord}
          setForbiddenWord={setForbiddenWord}
        />
      )}

      {isRankOpen && <GameRankModal roomInfo={roomInfo} isRankOpen={isRankOpen} setRankOpen={setRankOpen} />}
    </>
  );
};

export default GameWaiting;
