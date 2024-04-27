import framegame from '@/assets/images/framegame.gif';
import building1 from '@/assets/images/building1.png';
import building2 from '@/assets/images/building2.png';
import styles from '@/styles/game/GameWaitingFrame.module.css';

const GameWaitingFrame = () => {
  return (
    <>
      <div className={styles.Building}>
        <img src={building1} alt="building1" />
        <img src={building2} alt="building2" />
      </div>
      <img className={styles.GameWaitingFrame} src={framegame} alt="GameTemplate" />
    </>

  )
};

export default GameWaitingFrame;
