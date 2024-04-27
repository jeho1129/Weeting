import styles from '@/styles/game/GameWaitingChatting.module.css';
import GameChattingForm from './GameWaitingChattingForm';
import GameChattingList from './GameWaitingChattingList';

const GameWaitingChatting = () => {
  return (
    <>
        <div className={styles.ChatBoxBorder}></div>
        <div className={styles.ChatBox}>
            <GameChattingList/>
        </div>
        <GameChattingForm/>
        <div className={styles.ChatBuilding}>
        </div>
    </>
  );
};

export default GameWaitingChatting;