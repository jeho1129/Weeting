import React from 'react';
import styles from '@/styles/game/GameWaiting.module.css';
import GameWaitingLeftSide from '@/components/game/GameWaitingLeftSide';
import GameWaitingRightSide from '@/components/game/GameWaitingRightSide';

const GameWaiting = () => {
  // 더미 데이터
  const roomInfo = {
    roomid: "12345",
    roomname: "테스트 방",
    roommembers: [
      { memberid: "1", nickname: "멤버1", outfit: "casual", score: 100, ready: false },
      { memberid: "2", nickname: "멤버2", outfit: "sporty", score: 200, ready: true },
      { memberid: "3", nickname: "멤버3", outfit: "formal", score: 150, ready: false },
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
