import styles from '@/styles/game/GameWaiting.module.css';
import GameWaitingLeftSide from '@/components/game/GameWaitingLeftSide';
import GameWaitingRightSide from '@/components/game/GameWaitingRightSide';

const GameWaiting = () => {
  return (
    <>
    <div className={styles.SpaceEvenly}>
      <GameWaitingLeftSide/>
      <GameWaitingRightSide/>
      <div>
      </div>
    </div>
    </>
  );
};

export default GameWaiting;