import { useState } from 'react';
import styles from '@/styles/game/GameWaitingReadyButton.module.css';
import { RoomInfo } from '@/types/game';
import { userState } from '@/recoil/atom';
import { useRecoilValue, useSetRecoilState } from 'recoil';

const GameWaitingReadyButton = ({
  roomUsers,
  blink,
  onStartGame,
}: {
  roomUsers: RoomInfo['roomUsers'];
  blink?: boolean;
  onStartGame: () => void;
}) => {
  const [isReady, setIsReady] = useState(false);
  const myId = useRecoilValue(userState);

  const isFirstMember = roomUsers[0]?.userId === myId.userId;

  const ReadyHandler = () => {
    const isRoomFull = roomUsers.length >= 4;

    // 방장이며 방 인원수가 4명 미만일 때는 onStartGame 호출하지 않음
    if (isFirstMember && !isRoomFull) {
      // 게임 시작 로직을 실행하지 않고 조건에 대한 알림 또는 경고 메시지 표시할 수 있음
      alert('최소 4명이 필요합니다.');
      return;
    } else if (isFirstMember) {
      // 방 인원수가 충분할 때만 게임 시작
      onStartGame();
    } else {
      setIsReady(!isReady);
    }
  };

  // 방장인 경우 반짝이도록 수정
  const buttonContent = isFirstMember ? '게임시작' : isReady ? '준비 완료' : '준비';

  let buttonStyle = `FontM32 ${styles.Btn} ${isFirstMember && blink ? styles.Blink : ''}`;

  if (isReady) {
    buttonStyle = `FontM32  ${isFirstMember && blink ? styles.Blink : ''} ${styles.Btn} ${styles.Ready}`;
  }

  return (
    <>
      <button className={buttonStyle} onClick={ReadyHandler}>
        {buttonContent}
      </button>
    </>
  );
};

export default GameWaitingReadyButton;
