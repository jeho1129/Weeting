import framegame from '@/assets/images/framegame.gif';
import electricpole from '@/assets/images/electricpole.png';
import styles from '@/styles/game/GameWaitingFrame.module.css';

const GameWaitingFrame = () => {
  return (
    <>
      <img className={styles.ElectricPole} src={electricpole} alt="GameTemplate" />
      <img className={styles.GameWaitingFrame} src={framegame} alt="GameTemplate" />
    </>

  )
};

export default GameWaitingFrame;
