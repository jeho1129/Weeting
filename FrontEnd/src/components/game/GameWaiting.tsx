import { useState, useEffect } from 'react';

import GameForbiddenWord from '@/components/game/GameWordModal';
import GameRankModal from '@/components/game/GameRankModal';
import styles from '@/styles/game/GameWaiting.module.css';
import GameWaitingLeftSide from '@/components/game/GameWaitingLeftSide';
import GameWaitingRightSide from '@/components/game/GameWaitingRightSide';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { gameState, userState } from '@/recoil/atom';
import { RoomInfo, MessageScore } from '@/types/game';
import GameLoading from './GameLoading';
//////////// 추후 지울 값 ////////////////
import { dummy2 } from '@/types/game'; //
/////////////////////////////////////////

const GameWaiting = () => {
  ///////// 변수 선언 //////////////////////////////////////////////////////
  const userInfo = useRecoilValue(userState);
  const [gameStartLoading, setGameStartLoading] = useState(false);
  const [messageScore, setMessageScore] = useState<MessageScore>({
    nickname: userInfo.nickname,
    highest_similarity: 0,
  });
  const [webSocketRoom, setWebSocketRoom] = useState<WebSocket | null>(null);
  const [webSocketScore, setWebSocketScore] = useState<WebSocket | null>(null);

  // 모달 창 관련
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [isRankOpen, setRankOpen] = useState<boolean>(false);

  // 금지어 설정 완료
  const [choose, setChoose] = useState<boolean>(false);

  // 인게임 info는 useState값을 변경해서 사용
  const [roomInfo, setRoomInfo] = useState<RoomInfo>(dummy2);

  // recoil은 저장용(혹시 튕겼을 경우에 사용)
  const setRoomInfoRecoil = useSetRecoilState(gameState);

  //////////////////////////////////////////////////////////////////////

  ///////// 함수 선언 //////////////////////////////////////////////////////
  // 채팅 방 상태 변경 함수
  const changeRoomStatus = (status: 'waiting' | 'allready' | 'wordsetting' | 'start' | 'end') => {
    setRoomInfo((prev) => ({ ...prev, roomStatus: status }));
  };

  // 각 상태(대기, 준비, 게임중)에 따라 함수 호출 시 다음 상태(금지어설정, 게임중, 게임끝)로 자동 변경
  const wordSettingOrStart = () => {
    if (roomInfo.roomStatus === 'waiting' && roomInfo.roomUsers.length > 3) {
      changeRoomStatus('allready');
    } else if (roomInfo.roomStatus === 'allready') {
      changeRoomStatus('wordsetting');
    } else if (roomInfo.roomStatus === 'wordsetting') {
      changeRoomStatus('start');
    } else if (roomInfo.roomStatus === 'start') {
      changeRoomStatus('end');
    } else if (roomInfo.roomStatus === 'end') {
      changeRoomStatus('waiting');
    } else {
      changeRoomStatus('waiting');
    }
  };
  //////////////////////////////////////////////////////////////////////

  ///////// useEffect //////////////////////////////////////////////////////

  // roomInfo 웹소켓 연결
  useEffect(() => {
    // local 개발용
    // const ws = new WebSocket('ws://localhost:8000/ws');
    // 배포용
    const ws = new WebSocket('wss://54.180.158.223:9002/ws');
    // 백에서.... 1분간 채팅안한사람 확인해야할 거 같은데?
    // setRoomInfo
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);

  // roomInfo가 변경되면 recoil에 반영
  useEffect(() => {
    setRoomInfoRecoil(roomInfo);
  }, [roomInfo]);

  // 상태 변경 시 확인할 것
  useEffect(() => {
    if (roomInfo.roomStatus === 'start' && choose === null) {
      // 지금 유저를 isAlive에 값 넣어서 roomInfo에 반영
      // 이건... websocket이 되면 .send로 보내줘야함
      // 지금 유저가 금칙어를 입력해줘야하는 사람에게 임의의 값 지정
      // 이것도 백에서 해줘야할거같은데?
    }
    // roomstatus 가 start일 때
    // 점수 웹소켓 연결
    else if (roomInfo.roomStatus === 'start') {
      setGameStartLoading(true);
      setTimeout(() => {
        setGameStartLoading(false);
      }, 6000);
      // local용
      // const ws = new WebSocket('ws://localhost:8000/ws');
      // 배포용
      const ws = new WebSocket('wss://54.180.158.223:9002/ws');
      ws.onopen = () => {
        console.log('-----지호지호웹소캣가즈아--------');
      };
      ws.onmessage = (score) => {
        const Score: { nickname: string; highest_similarity: number } = JSON.parse(score.data);
        console.log(score.data);
        setMessageScore({
          nickname: Score.nickname,
          highest_similarity: Score.highest_similarity,
        });
        // 만약 가장 높은 점수라면
        if (roomInfo.roomUsers.filter((user) => user.userId === userInfo.userId)[0].score < Score.highest_similarity) {
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
  }, [roomInfo.roomStatus]);

  console.log(messageScore);

  // 금지어 설정 모달창
  useEffect(() => {
    if (roomInfo.roomStatus === 'wordsetting' && !choose) {
      setModalOpen(true);
    } else if (roomInfo.roomStatus === 'end') {
      setRankOpen(true);
    }
  }, [roomInfo, choose]);

  // 금지어가 모두 설정되었으면 상태 업데이트
  // 위의 change어쩌구 상태자동변경 함수랑 합쳐서 사용하면 될 듯
  useEffect(() => {
    const allWordsSet = roomInfo.roomUsers.every((user) => user.word !== null);

    if (allWordsSet && roomInfo.roomStatus === 'wordsetting') {
      changeRoomStatus('start');
    }
  }, [roomInfo.roomUsers]);

  //////////////////////////////////////////////////////////////////////
  // 게임 완료되면 처음으로 세팅하기
  const handleRoomUserReset = (updatedRoomInfo) => {
    setRoomInfo(updatedRoomInfo);
  }

  return (
    <>
      {gameStartLoading && <GameLoading />}
      {/* 모달 창 열기 */}
      {(isRankOpen || isModalOpen) && <div className={styles.modalOpenBackground}></div>}

      <div className={`FontM20 ${styles.SpaceEvenly}`}>
        <GameWaitingLeftSide roomInfo={roomInfo} messageScore={messageScore} changeRoomStatus={wordSettingOrStart} />
        <GameWaitingRightSide {...{ roomInfo, webSocketScore }} />
      </div>

      {isModalOpen && (
        <GameForbiddenWord
          roomInfo={roomInfo}
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          onConfirm={(word: string) => {
            console.log('설정된 금칙어:', word);
            setChoose(true);
            setModalOpen(false);
          }}
        />
      )}

      {isRankOpen && (
        <GameRankModal
          roomInfo={roomInfo}
          isOpen={isRankOpen}
          onClose={() => setRankOpen(false)}
          onStatusChange={() => {
            setRoomInfo((prev) => ({ ...prev, roomStatus: 'waiting', roomSubject: null }));
          }}
          onRoomUsersReset={handleRoomUserReset}
          />
      )}
    </>
  );
};

export default GameWaiting;
