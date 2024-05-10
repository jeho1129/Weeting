import { useEffect, useRef } from 'react';
import { ChatMessage } from '@/types/chat';
import styles from '@/styles/game/GameWaitingChatting.module.css';

interface GameChattingListProps {
  chatMessages: ChatMessage[];
}

const GameChattingList: React.FC<GameChattingListProps> = ({ chatMessages }) => {
  const chatListRef = useRef<HTMLDivElement>(null); // .ChatList에 대한 참조 추가

  const scrollToBottom = () => {
    const scrollHeight = chatListRef.current?.scrollHeight; // 총 스크롤 높이
    const height = chatListRef.current?.clientHeight; // 컨테이너 높이
    const maxScrollTop = scrollHeight! - height!; // 최대 스크롤 가능 위치
    chatListRef.current?.scrollTo({ top: maxScrollTop, behavior: 'smooth' }); // 최하단으로 스크롤
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]); // chatMessages가 변경될 때마다 스크롤을 최하단으로 이동

  return (
    <div ref={chatListRef} className={`FontD16 ${styles.ChatList}`}> {/* ref 할당 */}
      {chatMessages.map((message, index) => (
        <div key={index}>
          <strong style={{color:'blue'}}>{message.nickname}: </strong>{message.content}
        </div>
      ))}
    </div>
  );
};

export default GameChattingList;
