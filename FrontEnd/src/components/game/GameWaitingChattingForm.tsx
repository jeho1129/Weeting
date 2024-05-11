import { userState } from '@/recoil/atom';
import { RoomInfo } from '@/types/game';
import styles from '@/styles/game/GameWaitingChattingForm.module.css';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';

const GameChattingForm = ({
  roomInfo,
  webSocketScore,
  onSendMessage,
}: {
  roomInfo: RoomInfo;
  webSocketScore: WebSocket | null;
  onSendMessage: (conent: string) => void;
}) => {
  ///////// 변수 선언 //////////////////////////////////////////////////////
  const userInfo = useRecoilValue(userState);

  // 채팅 메세지 입력값
  const [message, setMessage] = useState('');
  const ingameUserInfo = roomInfo.roomUsers.filter((user) => user.userId === userInfo.userId)[0];

  ///////// 함수 선언 //////////////////////////////////////////////////////
  // 채팅 메세지 입력
  const onChatHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  // 입력 함수
  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    // 인게임 중 && 내가 쓴 단어가 금지어일 때
    if (roomInfo.roomStatus === 'start') {
      if (message.indexOf(ingameUserInfo.word!) !== -1) {
        // // 게임 정보 변경
        // // roomInfo 관련 websocket연결 후에 .send 형태로 변환
        // webSocketS~~~.send(JSON.stringify({
        //   roomMode: roomInfo.roomMode,
        //   roomId: roomInfo.roomId,
        //   roomName: roomInfo.roomName,
        //   roomStatus: roomInfo.roomStatus,
        //   roomForbiddentime: roomInfo.roomForbiddentime,
        //   roomEndtime: roomInfo.roomEndtime,
        //   roomSubject: roomInfo.roomSubject,
        //   roomMaxCnt: roomInfo.roomMaxCnt,
        //   roomUsers: roomInfo.roomUsers.map((user) =>
        //     user.userId === userInfo.userId
        //       ? {
        //           userId: ingameUserInfo.userId,
        //           nickname: ingameUserInfo.nickname,
        //           ready: ingameUserInfo.ready,
        //           word: ingameUserInfo.word,
        //           score: ingameUserInfo.score,
        //           isAlive: new Date().toTimeString(),
        //         }
        //       : user,
        //   ),
        //  }));
        /////////////////////////////////////////////////////////
        /////////////////////이쪽은 지워야함//////////////////////
        // setRoomInfo({
        //   roomMode: roomInfo.roomMode,
        //   roomId: roomInfo.roomId,
        //   roomName: roomInfo.roomName,
        //   roomStatus: roomInfo.roomStatus,
        //   roomForbiddentime: roomInfo.roomForbiddentime,
        //   roomEndtime: roomInfo.roomEndtime,
        //   roomSubject: roomInfo.roomSubject,
        //   roomMaxCnt: roomInfo.roomMaxCnt,
        //   roomUsers: roomInfo.roomUsers.map((user) =>
        //     user.userId === userInfo.userId
        //       ? {
        //           userId: ingameUserInfo.userId,
        //           nickname: ingameUserInfo.nickname,
        //           ready: ingameUserInfo.ready,
        //           word: ingameUserInfo.word,
        //           score: ingameUserInfo.score,
        //           isAlive: new Date().toTimeString(), // 년, 월, 일 필요없어서 Time만 씀 -> 재훈이랑 한번 더 말해봐서 값 뭘로 할지 통일해야함
        //         }
        //       : user,
        //   ),
        // });
        //////////////////////////////////////////////////////
      }
    }

    if (message.trim()) {
      // 인게임 상태라면
      if (webSocketScore && webSocketScore.readyState === WebSocket.OPEN) {
        webSocketScore.send(JSON.stringify({ nickname: userInfo.nickname, content: message }));
      }
      // 그외
      onSendMessage(message); // 부모 컴포넌트의 메시지 전송 함수 호출
      setMessage('');
    }
  };

  return (
    <div className={`FontM20 ${styles.Align}`}>
      <form onSubmit={submitHandler}>
        <div className={styles.Mgb}>
          <input
            className={`FontM20 ${styles.InputBox}`}
            id="text"
            type="text"
            placeholder="메세지를 입력해주세요"
            value={message}
            onChange={onChatHandler}
            maxLength={20}
          />
          <button className={`FontM20 ${styles.Btn}`}>확인</button>
        </div>
      </form>
    </div>
  );
};

export default GameChattingForm;
