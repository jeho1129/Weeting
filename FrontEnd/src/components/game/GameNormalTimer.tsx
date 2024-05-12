import { useState, useEffect } from 'react';
import styles from '@/styles/game/GameWordSetting.module.css';
import timerNormal from '@/assets/images/timerNormal.png';
import { RoomInfo } from '@/types/game';
import { useRecoilValue } from 'recoil';
import { gameState } from '@/recoil/atom';

const GameWordTimer = ({ roomInfo, changeRoomStatus }: { roomInfo: RoomInfo; changeRoomStatus: () => void }) => {
  // roomStatus가 start일 때 타이머를 240초로 설정
  const initialTime = roomInfo.roomStatus === 'start' ? 20 : 30;
  const [timeLeft, setTimeLeft] = useState(initialTime);
  

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    } else if (timeLeft == 0) {
      changeRoomStatus();
    }
  }, [timeLeft, roomInfo, changeRoomStatus]);

  return (
    <div className={styles.timerContainer}>
      <p className={styles.timerText}>{timeLeft}초</p>
      <img className={styles.GameWordTimer} src={timerNormal} alt="GameTemplate" />
    </div>
  );
};

export default GameWordTimer;
