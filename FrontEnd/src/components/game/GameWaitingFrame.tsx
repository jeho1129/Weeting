import framegame from '@/assets/images/framegame.gif';
import styles from '@/styles/game/GameWaitingFrame.module.css';

const GameWaitingFrame = () => {
  return <img className={styles.GameWaitingFrame} src={framegame} alt="GameTemplate" />;
};

export default GameWaitingFrame;
