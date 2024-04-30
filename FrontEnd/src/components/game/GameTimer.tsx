import React from 'react';
import styles from '@/styles/game/GameWordSetting.module.css';
import timerNormal from '@/assets/images/timerNormal.png';

const GameTimer = () => {
  return (
    <div className={styles.timerContainer}>
      <p className={styles.timerText}>타이머</p>
      <div>

      </div>
      <img className={styles.GameWordTimer} src={timerNormal} alt="GameTemplate" />
    </div>
  ); 
};

export default GameTimer;