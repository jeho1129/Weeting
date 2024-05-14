import styles from '@/styles/game/GameWaiting.module.css';
import { useState, useEffect } from 'react';
import { RoomInfo, MessageScore } from '@/types/game';

import GameWaitingReadyButton from '@/components/game/GameWaitingReadyButton';
import GameWaitingQuitButton from '@/components/game/GameWaitingQuitButton';
import GameWaitingMemberList from '@/components/game/GameWaitingMemberList';
import GameWaitingLogo from '@/components/game/GameWaitingLogo';
import GameWordTimer from '@/components/game/GameNormalTimer';
import GameRankTimer from '@/components/game/GameRankTimer';

const GameWaitingLeftSide = ({ roomInfo, messageScore }: { roomInfo: RoomInfo; messageScore: MessageScore }) => {
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    if (roomInfo.roomStatus === 'allready') {
      setBlink(true);
      setTimeout(() => {
        setBlink(false);
      }, 5000); // 5초 후에 반짝이는 효과를 종료
    }
  }, [roomInfo.roomStatus]);

  return (
    <>
      <div className={styles.AlignLeft}>
        {/* <div className={styles.Align}> */}
        <GameWaitingLogo />
        <GameWaitingMemberList roomInfo={roomInfo} />
        {(roomInfo.roomStatus === 'waiting' || roomInfo.roomStatus === 'allready' || roomInfo.roomStatus === 'end') && (
          <div className={styles.ButtonAlign}>
            <GameWaitingReadyButton roomId={roomInfo.roomId} roomUsers={roomInfo.roomUsers} blink={blink} />
            <GameWaitingQuitButton roomId={roomInfo.roomId} />
          </div>
        )}
        {(roomInfo.roomStatus === 'wordsetting' ||
          roomInfo.roomStatus === 'wordfinish' ||
          roomInfo.roomStatus === 'start') &&
          (roomInfo.roomMode === 'rank' ? (
            <GameRankTimer roomInfo={roomInfo} messageScore={messageScore} />
          ) : (
            <GameWordTimer roomInfo={roomInfo} />
          ))}
      </div>
    </>
  );
};

export default GameWaitingLeftSide;
