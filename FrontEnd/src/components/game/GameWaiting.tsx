import styles from '@/styles/game/GameWaiting.module.css';
import GameWaitingReadyButton from '@/components/game/GameWaitingReadyButton';
import GameWaitingQuitButton from '@/components/game/GameWaitingQuitButton';

const GameWaiting = () => {
  return (
    <>
      <div className={styles.BtnAlign}>
      <GameWaitingReadyButton />
      <GameWaitingQuitButton />
      </div>
    </>
  );
};

export default GameWaiting;
