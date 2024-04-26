import React from 'react';
import styles from '@/styles/game/GameWordSetting.module.css';
import timerNormal from '@/assets/images/timerNormal.png';

const GameWordTimer = () => {
  return (
    <div className={styles.timerContainer}> {/* timerContainer 클래스를 추가한 컨테이너 div */}
      <p className={styles.timerText}>여기에 글씨</p> {/* 이미지 위에 배치할 텍스트 */}
      <img className={styles.GameWordTimer} src={timerNormal} alt="GameTemplate" />
    </div>
  );
};

export default GameWordTimer;
