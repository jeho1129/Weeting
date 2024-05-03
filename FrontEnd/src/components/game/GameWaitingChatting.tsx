import { useState } from 'react';
import styles from '@/styles/game/GameWaitingChatting.module.css';
import GameChattingForm from './GameWaitingChattingForm';
import GameChattingList from './GameWaitingChattingList';
import { ChatMessage } from '@/types/chat';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userState } from '@/recoil/atom';

const GameWaitingChatting: React.FC = () => {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  const userInfo = useRecoilValue(userState);

  const onSendMessage = (message: string) => {
    const newMessage: ChatMessage = {
      content: message,
      time: new Date().toISOString(),
      nickname: userInfo.nickname, // userInfo에서 nickname을 가져와서 저장
    };
    console.log(new Date().toLocaleString());

    setChatMessages([...chatMessages, newMessage]); // 새 메시지를 chatMessages 배열에 추가
  };

  return (
    <>
      <div className={styles.ChatBoxBorder}></div>
      <div className={styles.ChatBox}>
        <GameChattingList chatMessages={chatMessages} />
      </div>
      <GameChattingForm onSendMessage={onSendMessage} />
      <div className={styles.ChatBuilding}></div>
    </>
  );
};

export default GameWaitingChatting;
