import styles from '@/styles/game/GameWaiting.module.css';

import GameWaitingChatting from '@/components/game/GameWaitingChatting';
import GameWaitingPole from '@/components/game/GameWaitingPole';
const GameWaitingLeftSide = ({ roomInfo }: { roomInfo: RoomInfo }) => {
  return (
    <>
    <div className={styles.RightSide}>
      <GameWaitingPole roommembers={roomInfo.roommembers}/>
      <GameWaitingChatting/>
    </div>
    </>
  );
};

export default GameWaitingLeftSide;