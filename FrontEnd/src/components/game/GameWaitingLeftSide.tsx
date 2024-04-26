import styles from '@/styles/game/GameWaiting.module.css';
import { RoomInfo } from '@/types/game';
import GameWaitingReadyButton from '@/components/game/GameWaitingReadyButton';
import GameWaitingQuitButton from '@/components/game/GameWaitingQuitButton';
import GameWaitingMemberList from '@/components/game/GameWaitingMemberList';
import GameWaitingLogo from '@/components/game/GameWaitingLogo';

const GameWaitingLeftSide = ({ roomInfo }: { roomInfo: RoomInfo }) => {
  return (
    <>
    <div className={styles.Align}>
        <GameWaitingLogo/>  
        <GameWaitingMemberList roommembers={roomInfo.roommembers}/>
        <div className={styles.ButtonAlign}>
          <GameWaitingReadyButton roommembers={roomInfo.roommembers}/>
          <GameWaitingQuitButton roomid={roomInfo.roomid}/>
        </div>
    </div>
    </>
  );
};

export default GameWaitingLeftSide;