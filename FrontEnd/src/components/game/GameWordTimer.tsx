import { useState, useEffect } from 'react';
import styles from '@/styles/game/GameWordSetting.module.css';
import timerNormal from '@/assets/images/timerNormal.png';

const GameWordTimer = ({ roomInfo, changeRoomStatus }) => {
  // roomStatus가 start일 때 타이머를 240초로 설정
  const initialTime = roomInfo.roomStatus === 'start' ? 240 : 30;
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    } else {
      if (roomInfo.roomStatus !== 'start') {
        changeRoomStatus('start');
      }
    }
  }, [timeLeft, roomInfo, changeRoomStatus]);

  return (
    <div className={styles.timerContainer}>
      <p className={styles.timerText}>타이머: {timeLeft}초</p>
      <div>
        {/* Timer 구현 */}
      </div>
      <img className={styles.GameWordTimer} src={timerNormal} alt="GameTemplate" />
    </div>
  );
};

export default GameWordTimer;
