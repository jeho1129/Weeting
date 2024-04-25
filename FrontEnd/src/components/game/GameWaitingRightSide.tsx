import styles from '@/styles/game/GameWaiting.module.css';

import GameWaitingChatting from '@/components/game/GameWaitingChatting';
import GameWaitingPole from '@/components/game/GameWaitingPole';
const GameWaitingLeftSide = () => {
  return (
    <>
    <div className={styles.Align}>
      <GameWaitingPole/>
      <GameWaitingChatting/>
    </div>
    </>
  );
};

export default GameWaitingLeftSide;