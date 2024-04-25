import styles from '@/styles/game/GameWaiting.module.css';

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
          <GameWaitingReadyButton />
          <GameWaitingQuitButton />
        </div>
    </div>
    </>
  );
};

export default GameWaitingLeftSide;