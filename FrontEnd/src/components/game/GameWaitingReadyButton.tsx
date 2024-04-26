import { useState } from 'react';
import styles from '@/styles/game/GameWaitingReadyButton.module.css';
import { useNavigate } from 'react-router-dom';
import { RoomInfo } from '@/types/game';

const GameWaitingReadyButton = ({roommembers}: { roommembers: RoomInfo["roommembers"] }) => {
  const [isReady, setIsReady] = useState(false);
  const navigate = useNavigate();

  const ReadyHandler = () => {
    setIsReady(!isReady);
  };

  const buttonStyle = isReady ? `${styles.Btn} ${styles.Ready}` : styles.Btn;

  return (
    <>
      <button className={buttonStyle} onClick={ReadyHandler}>
        {isReady ? '준비 취소' : '준비'}
      </button>
    </>
  );
};

export default GameWaitingReadyButton;
