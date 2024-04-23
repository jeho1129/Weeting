import framegame from '@/assets/images/framegame.gif';
import styles from '@/styles/main/GameWaiting.module.css';

const GameWaitingFrame = () => {
  return <img className={styles.GameWaitingFrame} src={framegame} alt="DayTemplate" />;
};

export default GameWaitingFrame;
