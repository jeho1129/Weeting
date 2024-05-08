import { useState, useEffect } from 'react';
import styles from '@/styles/game/GameWordSetting.module.css';
import timerRank from '@/assets/images/timerRank.png';
import { RoomInfo } from '@/types/game';
import { useRecoilValue } from 'recoil';
import { gameState, userState } from '@/recoil/atom';

const GameRankTimer = ({ roomInfo, changeRoomStatus }: { roomInfo: RoomInfo; changeRoomStatus: () => void }) => {
  // roomStatus가 start일 때 타이머를 240초로 설정
  const initialTime = roomInfo.roomStatus === 'start' ? 240 : 30;
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const gameInfo = useRecoilValue(gameState);
  const userInfo = useRecoilValue(userState);

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

  const currentUserScore = gameInfo.roomUsers.find((user) => user.userId === userInfo.userId)?.score;

  return (
    <div className={styles.RanktimerContainer}>
      <div className={styles.Ranktimers}>
        <div className={styles.PersonalScore}>{currentUserScore !== undefined && <p>현재 점수 : {currentUserScore}</p>}</div>
        <p className={styles.RanktimerText}>{timeLeft}초</p>
      </div>
      <img className={styles.GameWordTimer} src={timerRank} alt="GameTemplate" />
    </div>
  );
};

export default GameRankTimer;
