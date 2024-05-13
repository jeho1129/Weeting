import { useState, useEffect } from 'react';
import styles from '@/styles/game/GameWordSetting.module.css';
import timerRank from '@/assets/images/timerRank.png';
import { RoomInfo, MessageScore } from '@/types/game';

const GameRankTimer = ({
  roomInfo,
  changeRoomStatus,
  messageScore,
}: {
  roomInfo: RoomInfo;
  changeRoomStatus: () => void;
  messageScore: MessageScore;
}) => {
  // roomStatus가 start일 때 타이머를 240초로 설정
  const initialTime = roomInfo.roomStatus === 'start' ? 240 : 30;
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
    <div className={styles.RanktimerContainer}>
      <div className={styles.Ranktimers}>
        <div className={styles.PersonalScore}>
          <p>현재 점수 : {messageScore.highest_similarity}</p>
        </div>
        <p className={styles.RanktimerText}>{timeLeft}초</p>
      </div>
      <img className={styles.GameWordTimer} src={timerRank} alt="GameTemplate" />
    </div>
  );
};

export default GameRankTimer;
