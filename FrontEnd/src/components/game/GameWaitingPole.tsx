import styles from '@/styles/game/GameWaiting.module.css';
import electricpole from '@/assets/images/electricpole.png';

const GameWaitingPole = () => {
  return (
    <>
      <img className={styles.ElectricPole} src={electricpole} alt="GameTemplate" />
    </>
  );
};

export default GameWaitingPole;
