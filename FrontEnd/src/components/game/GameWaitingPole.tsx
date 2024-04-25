import styles from '@/styles/game/GameWaiting.module.css';
import electricpole from '@/assets/images/electricpole.png';
import avatar from '@/assets/images/inGameAvatar.png';

const GameWaitingPole = () => {
  return (
    <>
      <div>
        
      </div>
      <img className={styles.ElectricPole} src={electricpole} alt="GameTemplate" />
    </>
  );
};

export default GameWaitingPole;
