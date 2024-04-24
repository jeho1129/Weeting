import styles from '@/styles/game/GameWaiting.module.css';
import GameWaitingReadyButton from '@/components/game/GameWaitingReadyButton';
import GameWaitingQuitButton from '@/components/game/GameWaitingQuitButton';
import GameWaitingMemberList from '@/components/game/GameWaitingMemberList';

const GameWaiting = () => {
  return (
    <>
    <div className={styles.Align}>
      <div>
      <GameWaitingMemberList/>
      </div>
      <div className={styles.ButtonAlign}>
      <GameWaitingReadyButton />
      <GameWaitingQuitButton />
      </div>
    </div>
    </>
  );
};

export default GameWaiting;
