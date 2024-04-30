import { useState } from 'react';
import styles from '@/styles/game/GameWaitingReadyButton.module.css';
import { RoomInfo } from '@/types/game';
import { useNavigate } from 'react-router-dom';

const GameWaitingReadyButton = ({roommembers, blink, onStartGame}: { roommembers: RoomInfo["roommembers"], blink?: boolean, onStartGame: () => void  }) => {
  const [isReady, setIsReady] = useState(false);
  const navigate = useNavigate();

  const ReadyHandler = () => {
    if (isFirstMember) {
      onStartGame();
    } else {
      setIsReady(!isReady);
    }
  };
  
  // 방장인 경우 반짝이도록 수정
  const isFirstMember = roommembers.findIndex(member => member.userId === '1') === 0;
  const buttonContent = isFirstMember ? '게임시작' : (isReady ? '준비 취소' : '준비');

  let buttonStyle = `FontM32 ${styles.Btn} ${isFirstMember && blink ? styles.Blink : ''}`;

  if (isReady) {
    buttonStyle = `FontM32 ${buttonStyle} ${styles.Ready}`;
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