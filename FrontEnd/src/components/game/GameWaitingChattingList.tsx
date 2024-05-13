import { useEffect, useRef } from 'react';
import { ChatMessage } from '@/types/chat';
import { RoomInfo, MessageScore } from '@/types/game';
import styles from '@/styles/game/GameWaitingChatting.module.css';
import { userState } from '@/recoil/atom';
import { useRecoilValue } from 'recoil';

interface GameChattingListProps {
  roomUsers: RoomInfo['roomUsers'];
  chatMessages: ChatMessage[];
}

const GameChattingList: React.FC<GameChattingListProps> = ({ roomUsers, chatMessages }) => {
  const chatListRef = useRef<HTMLDivElement>(null); // .ChatList에 대한 참조 추가
  const userInfo = useRecoilValue(userState);

  const scrollToBottom = () => {
    const scrollHeight = chatListRef.current?.scrollHeight; // 총 스크롤 높이
    const height = chatListRef.current?.clientHeight; // 컨테이너 높이
    const maxScrollTop = scrollHeight! - height!; // 최대 스크롤 가능 위치
    chatListRef.current?.scrollTo({ top: maxScrollTop, behavior: 'smooth' }); // 최하단으로 스크롤
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]); // chatMessages가 변경될 때마다 스크롤을 최하단으로 이동

  // 현재 내 상태 확인
  const currentUserAlive = roomUsers.find((user) => user.nickname === userInfo.nickname)?.isAlive === '';

  return (
    <div ref={chatListRef} className={`FontD16 ${styles.ChatList}`}>
      {' '}
      {chatMessages.map((message, index) => {
        // 메시지를 보낸 사용자의 생존 상태
        const messageUserAlive = roomUsers.find((user) => user.nickname === message.nickname)?.isAlive === '';
        const messageColor = messageUserAlive ? '#0093f3' : '#d0d0d0';
        // 내가 죽었으면 return에 모든 메세지 보이도록.
        // 내가 살았으면 살아있는 사람의 메세지만 보이도록.
        if (!currentUserAlive || (currentUserAlive && messageUserAlive)) {
          return (
            <div key={index}>
              <strong style={{ color: messageColor }}>{message.nickname}　　</strong>
              {message.content}
            </div>
          );
        }
        return null; // 해당하지 않는 경우 메시지를 렌더링하지 않음
      })}
    </div>
  );
};

export default GameChattingList;
