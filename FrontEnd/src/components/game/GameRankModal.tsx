import styles from '@/styles/game/GameEnd.module.css';
import { RoomInfo } from '@/types/game';
import { IngameUser } from '@/types/user';

interface GameRankModalProps {
  roomInfo: RoomInfo;
  roomUsersNew: IngameUser;
  isRankOpen: boolean;
  setRankOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const GameRankModal = ({ roomInfo, roomUsersNew, isRankOpen, setRankOpen }: GameRankModalProps) => {
  if (!isRankOpen) {
    return <></>;
  }
  console.log(roomUsersNew);

  return (
    <div className={`FontM20 ${styles.Container}`}>
      {/* <div className={styles.modal}>
        <ul>
          {roomInfo.roomMode === 'rank'
            ? roomUsersNew.map((member, index) => (
                <li key={member.id} className={index === 0 ? 'FontM32' : ''}>
                  <div className={styles.Center}>
                    {index === 0 ? ' 1등 ' : `${index + 1}등`} {member.nickname}
                  </div>
                  <div className={styles.Center}>점수: {member.score}</div>
                </li>
              ))
            : roomInfo.roomMode === 'normal'
              ? normalMembers.map((member) => (
                  <li key={member.id} className={'FontM32'}>
                    <div className={styles.FlexContainer}>
                      <div>{member.nickname}</div>
                      <div>{member.isAlive === '' ? '생존 😊' : '탈락 🍗'}</div>
                    </div>
                  </li>
                ))
              : null}
        </ul>
      </div> */}
      <button className={`FontM20 ${styles.Btn}`} onClick={() => setRankOpen(false)}>
        확인
      </button>
    </div>
  );
};

export default GameRankModal;
