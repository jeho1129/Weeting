import styles from '@/styles/game/GameWaiting.module.css';
import { useState, useEffect } from 'react';
import { RoomInfo } from '@/types/game';
import { ScoreUpdate } from '@/types/chat';

import GameWaitingReadyButton from '@/components/game/GameWaitingReadyButton';
import GameWaitingQuitButton from '@/components/game/GameWaitingQuitButton';
import GameWaitingMemberList from '@/components/game/GameWaitingMemberList';
import GameWaitingLogo from '@/components/game/GameWaitingLogo';
import GameWordTimer from '@/components/game/GameNormalTimer';
import GameRankTimer from '@/components/game/GameRankTimer';

import RoomModes from './../room/RoomModes';

const GameWaitingLeftSide = ({
  roomInfo,
  scoreUpdates,
  changeRoomStatus,
}: {
  roomInfo: RoomInfo;
  scoreUpdates: number;
  changeRoomStatus: () => void;
}) => {
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
      <div className={styles.Align}>
        <GameWaitingLogo />
        <GameWaitingMemberList
          roomMode={roomInfo.roomMode}
          roomStatus={roomInfo.roomStatus}
          roomMaxCnt={roomInfo.roomMaxCnt}
          roomUsers={roomInfo.roomUsers}
        />
        {(roomInfo.roomStatus === 'waiting' || roomInfo.roomStatus === 'allready' || roomInfo.roomStatus === 'end') && (
          <div className={styles.ButtonAlign}>
            <GameWaitingReadyButton roomUsers={roomInfo.roomUsers} blink={blink} onStartGame={changeRoomStatus} />
            <GameWaitingQuitButton roomId={roomInfo.roomId} />
          </div>
        )}
        {(roomInfo.roomStatus === 'wordsetting' || roomInfo.roomStatus === 'start') &&
          (roomInfo.roomMode === 'rank' ? (
            <GameRankTimer roomInfo={roomInfo} changeRoomStatus={changeRoomStatus} />
          ) : (
            <GameWordTimer roomInfo={roomInfo} changeRoomStatus={changeRoomStatus} />
          ))}
      </div>
    </>
  );
};

export default GameWaitingLeftSide;
