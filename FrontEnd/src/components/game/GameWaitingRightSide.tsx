import { useState } from 'react';

import styles from '@/styles/game/GameWaiting.module.css';
import { RoomInfo } from '@/types/game';
import { ChatMessage } from '@/types/chat';
import GameChattingList from './GameWaitingChattingList';
import GameChattingForm from './GameWaitingChattingForm';

import GameWaitingPole from '@/components/game/GameWaitingPole';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userState } from '@/recoil/atom';

const GameWaitingRightSide = ({ roomInfo }: { roomInfo: RoomInfo }) => {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  const userInfo = useRecoilValue(userState);

  const onSendMessage = (message: string) => {
    const newMessage: ChatMessage = {
      userId: userInfo.userId,
      content: message,
      time: new Date().toLocaleString(),
      nickname: userInfo.nickname, // userInfo에서 nickname을 가져와서 저장
    };

    setChatMessages([...chatMessages, newMessage]); // 새 메시지를 chatMessages 배열에 추가
  };
  return (
    <>
      <div className={styles.RightSide}>
        <GameWaitingPole
          roomName={roomInfo.roomName}
          roomStatus={roomInfo.roomStatus}
          roomUsers={roomInfo.roomUsers}
          roomMaxCnt={roomInfo.roomMaxCnt}
          chatMessage={chatMessages}
        />
        <div className={styles.ChatBoxBorder}></div>
        <div className={styles.ChatBox}>
          <GameChattingList chatMessages={chatMessages} />
        </div>
        <GameChattingForm onSendMessage={onSendMessage} />
        <div className={styles.ChatBuilding}></div>
      </div>
    </>
  );
};

export default GameWaitingRightSide;
