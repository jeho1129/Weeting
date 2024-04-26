import styles from '@/styles/game/GameWaiting.module.css';
import { RoomInfo } from '@/types/game';
import GameWaitingChatting from '@/components/game/GameWaitingChatting';
import GameWaitingPole from '@/components/game/GameWaitingPole';
const GameWaitingLeftSide = ({ roomInfo }: { roomInfo: RoomInfo }) => {
  return (
    <>
    <div className={styles.RightSide}>
      <GameWaitingPole roommembers={roomInfo.roommembers} roommaxcnt={roomInfo.roommaxcnt}/>
      <GameWaitingChatting/>
    </div>
    </>
  );
};

export default GameWaitingLeftSide;