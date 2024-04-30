import React, { useEffect, useRef } from 'react';
import { ChatMessage } from '@/types/chat';
import styles from '@/styles/game/GameWaitingChatting.module.css';

interface GameChattingListProps {
  chatMessages: ChatMessage[];
}

const GameChattingList: React.FC<GameChattingListProps> = ({ chatMessages }) => {
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]); // chatMessages가 변경될 때마다 스크롤을 최하단으로 이동

  return (
    <div className={`FontD16 ${styles.ChatList}`}>
      {chatMessages.map((message, index) => (
        <div key={index}>{message.content}</div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default GameChattingList;
