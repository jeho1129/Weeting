import React from 'react';

import styles from '@/styles/game/GameWaiting.module.css';
import GameWaitingLeftSide from '@/components/game/GameWaitingLeftSide';
import GameWaitingRightSide from '@/components/game/GameWaitingRightSide';

const GameWaiting = () => {
  // 더미 데이터
  const roomInfo = {
    roomid: "12345",
    roomname: "테스트 방",
    roomstatus: "waiting",
    roommembers: [
      { memberid: "1", nickname: "나야나방장", outfit: "casual", score: 100, ready: false },
      { memberid: "2", nickname: "줴훈줴훈", outfit: "sporty", score: 200, ready: true },
      { memberid: "3", nickname: "헤엥", outfit: "formal", score: 150, ready: false },
      { memberid: "4", nickname: "웅냥냥", outfit: "formal", score: 150, ready: false },
      { memberid: "5", nickname: "홀롤로", outfit: "formal", score: 150, ready: false },
      { memberid: "6", nickname: "웅냐", outfit: "formal", score: 150, ready: false },
      { memberid: "7", nickname: "헤위이잉", outfit: "formal", score: 150, ready: false },
      { memberid: "8", nickname: "인범머스크", outfit: "formal", score: 150, ready: false },
    ]
  };

  return (
    <>
      <div className={styles.SpaceEvenly}>
        <GameWaitingLeftSide roomInfo={roomInfo}/>
        <GameWaitingRightSide roomInfo={roomInfo}/>
      </div>
    </>
  );
};

export default GameWaiting;
