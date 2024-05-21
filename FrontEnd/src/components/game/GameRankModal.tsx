import styles from '@/styles/game/GameEnd.module.css';
import { RoomInfo } from '@/types/game';
import { IngameUser } from '@/types/user';

interface GameRankModalProps {
  roomStartInfo: RoomInfo;
  isRankOpen: boolean;
  setRankOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const GameRankModal = ({ roomStartInfo, isRankOpen, setRankOpen }: GameRankModalProps) => {
  if (!isRankOpen) {
    return <></>;
  }
  const sortedUsers = [...roomStartInfo.roomUsers].sort((a, b) => b.score - a.score);
  return (
    <div className={`FontM20 ${styles.Container}`}>
      <div className={styles.modal}>
        {roomStartInfo.roomMode === 'rank'
          ? sortedUsers.map((user) => (
              <div key={user.id} className={'FontM32'}>
                <div className={styles.FlexContainer}>
                  <span>{user.nickname}</span>
                  <span>{user.score} 점</span>
                </div>
              </div>
            ))
          : roomStartInfo.roomMode === 'normal'
            ? roomStartInfo.roomUsers.map((user) => (
                <div key={user.id} className={'FontM32'}>
                  <div className={styles.FlexContainer}>
                    <span>{user.nickname}</span>
                    <span>{user.isAlive === '' ? '생존 😊' : '탈락 🍗'}</span>
                  </div>
                </div>
              ))
            : null}
      </div>

      <button className={`FontM20 ${styles.Btn}`} onClick={() => setRankOpen(false)}>
        확인
      </button>
    </div>
  );
};

export default GameRankModal;
