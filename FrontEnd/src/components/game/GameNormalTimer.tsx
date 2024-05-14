import { useState, useEffect } from 'react';
import styles from '@/styles/game/GameWordSetting.module.css';
import timerNormal from '@/assets/images/timerNormal.png';
import { RoomInfo } from '@/types/game';

const GameWordTimer = ({ roomInfo }: { roomInfo: RoomInfo }) => {
  // roomStatus가 start일 때 타이머를 240초로 설정
  // roomStatus가 start일 때 타이머를 240초로 설정
  const endTime: string | null = roomInfo.roomEndTime;
  const forbiddenTime: string | null = roomInfo.roomForbiddenTime;
  const [endTimeLeft, setEndTimeLeft] = useState('');
  const [forbiddenTimeLeft, setForbiddenTimeLeft] = useState('');

  useEffect(() => {
    // console.log(new Date().toLocaleString());
    if (endTime != null) {
      setEndTimeLeft(((new Date(endTime).getTime() - new Date().getTime()) / 1000).toFixed(0).toString());
    }

    if (forbiddenTime != null) {
      setForbiddenTimeLeft(((new Date(forbiddenTime).getTime() - new Date().getTime()) / 1000).toFixed(0).toString());
    }
  }, [roomInfo]);

  useEffect(() => {
    if (roomInfo.roomStatus === 'wordsetting') {
      const timerId = setInterval(() => {
        setForbiddenTimeLeft(
          ((new Date(forbiddenTime!).getTime() - new Date().getTime()) / 1000).toFixed(0).toString(),
        );
      }, 1000);

      setTimeout(() => {
        clearInterval(timerId);
        setForbiddenTimeLeft('0');
        // status 변경 websocket?? publish? send?
      }, 30000);
    } else if (roomInfo.roomStatus === 'start') {
      const timerId = setInterval(() => {
        setEndTimeLeft((new Date(endTime!).getTime() - new Date().getTime()).toFixed(0).toString());
      }, 1000);

      setTimeout(() => {
        clearInterval(timerId);
        setEndTimeLeft('0');
        // status 변경 websocket?? publish? send?
      }, 240000);
    } else {
    }
  }, [roomInfo]);

  return (
    <div className={styles.timerContainer}>
      <p className={styles.timerText}>
        {roomInfo.roomStatus === 'wordsetting' ? forbiddenTimeLeft : roomInfo.roomStatus === 'start' ? endTimeLeft : ''}
        초
      </p>
      <img className={styles.GameWordTimer} src={timerNormal} alt="GameTemplate" />
    </div>
  );
};

export default GameWordTimer;
