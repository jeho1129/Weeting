import { useState } from 'react';
import styles from '@/styles/game/GameWaitingChatting.module.css';
import GameChattingForm from './GameWaitingChattingForm';
import GameChattingList from './GameWaitingChattingList';
import { ChatMessage } from '@/types/chat';

const GameWaitingChatting: React.FC = () => {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  const onSendMessage = (message: string) => {
    const newMessage: ChatMessage = { content: message }; // ChatMessage 타입에 맞게 newMessage 생성
    setChatMessages([...chatMessages, newMessage]); // 새 메시지를 chatMessages 배열에 추가
  };

  return (
    <>
        <div className={styles.ChatBoxBorder}></div>
        <div className={styles.ChatBox}>
            <GameChattingList chatMessages={chatMessages}/>
        </div>
        <GameChattingForm onSendMessage={onSendMessage}/>
        <div className={styles.ChatBuilding}></div>
    </>
  );
};

export default GameWaitingChatting;
