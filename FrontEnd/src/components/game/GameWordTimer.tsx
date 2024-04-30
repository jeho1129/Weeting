import React, { useState, useEffect } from 'react';
import styles from '@/styles/game/GameWordSetting.module.css';
import timerNormal from '@/assets/images/timerNormal.png';

const GameWordTimer = () => {
  const [timeLeft, setTimeLeft] = useState(30); // 30초부터 시작

  useEffect(() => {
    // 타이머가 0이 될 때까지 매 초마다 감소
    if (timeLeft > 0) {
      const timerId = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    }
  }, [timeLeft]);

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
