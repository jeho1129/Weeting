import { useState } from 'react';
import styles from '@/styles/game/GameWaitingReadyButton.module.css';
import { RoomInfo } from '@/types/game';
import { useNavigate } from 'react-router-dom';

const GameWaitingReadyButton = ({roommembers, blink}: { roommembers: RoomInfo["roommembers"], blink?: boolean  }) => {
  const [isReady, setIsReady] = useState(false);
  const navigate = useNavigate();

  const ReadyHandler = () => {
    setIsReady(!isReady);
  };

  // 방장인 경우 반짝이도록으로 수정
  const isFirstMember = roommembers.findIndex(member => member.memberid === '1') === 0;
  const buttonContent = isFirstMember ? '게임시작' : (isReady ? '준비 취소' : '준비');

  let buttonStyle = `${styles.Btn} ${isFirstMember && blink ? styles.Blink : ''}`;

  if (isReady) {
    buttonStyle = `${buttonStyle} ${styles.Ready}`;
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