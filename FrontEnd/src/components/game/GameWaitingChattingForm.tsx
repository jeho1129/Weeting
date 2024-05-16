import { userState } from '@/recoil/atom';
import { RoomInfo } from '@/types/game';
import styles from '@/styles/game/GameWaitingChattingForm.module.css';
import { useState, useEffect } from 'react';
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
  const ingameUserInfo = roomInfo.roomUsers.filter((user) => user.id === userInfo.userId)[0];

  // 마지막으로 채팅 입력한 시간
  const [lastMessageTime, setLastMessageTime] = useState<Date | null>(null);

  ///////// 함수 선언 //////////////////////////////////////////////////////
  // 채팅 메세지 입력
  const onChatHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
    setLastMessageTime(new Date()); // 메세지 입력 시 현재 시간을 업데이트
  };

  // 내 정보 웹소캣으로 전달
  useEffect(() => {
    if (roomInfo.roomStatus === 'start') {
      const timer = setTimeout(() => {
        if (lastMessageTime && new Date().getTime() - lastMessageTime.getTime() >= 15000) {
          // 게임 정보 변경
          // // roomInfo 관련 websocket연결 후에 .send 형태로 변환
          // 현재 시간을 'HH:MM:SS' 형태의 문자열로 포맷팅합니다.
          // const currentTimeFormatted = new Date().toTimeString().split(' ')[0];
          // TODO: 여기서 user.isAlive를 업데이트하는 로직을 구현합니다.
          // 예시로는 webSocket을 통해 서버에 업데이트 요청을 보내는 방법이 있습니다.
          // if (webSocketScore && webSocketScore.readyState === WebSocket.OPEN) {
          //   webSocketScore.send(
          //     JSON.stringify({
          //       userId: userInfo.userId,
          //       isAlive: currentTimeFormatted,
          //     }),
          //   );
          // }
        }
      }, 15000);

      // 컴포넌트가 언마운트되거나 lastMessageTime이 업데이트될 때 타이머를 클리어합니다.
      return () => clearTimeout(timer);
    }
    // 의존성 배열에 roomInfo.roomStatus를 추가합니다. 이렇게 하면 roomInfo.roomStatus가 변할 때마다 useEffect가 다시 실행됩니다.
  }, [lastMessageTime, roomInfo.roomStatus]);

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
      }
    }

    if (message.trim()) {
      // 인게임 상태라면
      if (webSocketScore && webSocketScore.readyState === WebSocket.OPEN) {
        webSocketScore.send(JSON.stringify({ nickname: userInfo.nickname, content: message }));
      }
      // 그외
      onSendMessage(message);
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
