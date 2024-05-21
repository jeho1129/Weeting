import styles from '@/styles/game/GameEnd.module.css';
import { RoomInfo } from '@/types/game';
import { IngameUser } from '@/types/user';
import Avatar from '@/components/avatar/Avatar';

interface GameRankModalProps {
  roomStartInfo: RoomInfo;
  isRankOpen: boolean;
  setRankOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const GameRankModal = ({ roomStartInfo, isRankOpen, setRankOpen }: GameRankModalProps) => {
  if (!isRankOpen) {
    return <></>;
  }
  console.log(roomStartInfo);
  console.log(roomStartInfo.roomUsers);
  console.log(roomStartInfo.roomUsers);

  return (
    <div className={`FontM20 ${styles.Container}`}>
      <div className={styles.modal}>
        <ul>
          {roomStartInfo.roomMode === 'rank'
            ? // roomUsers 배열을 score 기준으로 내림차순 정렬
              [...roomStartInfo.roomUsers]
                .sort((a, b) => b.score - a.score)
                .map((member) => (
                  <li key={member.id} className={'FontM32'}>
                    <div className={styles.FlexContainer}>
                      <div>{member.nickname}</div>
                      <div>{member.score} 점</div>
                    </div>
                  </li>
                ))
            : roomStartInfo.roomMode === 'normal'
              ? roomStartInfo.roomUsers.map((member) => (
                  <li key={member.id} className={'FontM32'}>
                    <div className={styles.FlexContainer}>
                      <div>{member.nickname}</div>
                      <div>{member.isAlive === '' ? '생존 😊' : '탈락 🍗'}</div>
                    </div>
                  </li>
                ))
              : null}
        </ul>
      </div>
      <button className={`FontM20 ${styles.Btn}`} onClick={() => setRankOpen(false)}>
        확인
      </button>
    </div>
  );
};

export default GameRankModal;
