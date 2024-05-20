import styles from '@/styles/game/GameEnd.module.css';
import { RoomInfo } from '@/types/game';
import { IngameUser } from '@/types/user';
import Avatar from '@/components/avatar/Avatar';

interface GameRankModalProps {
  roomInfo: RoomInfo;
  isRankOpen: boolean;
  setRankOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const GameRankModal = ({ roomInfo, isRankOpen, setRankOpen }: GameRankModalProps) => {
  if (!isRankOpen) {
    return <></>;
  }
  return (
    <div className={`FontM20 ${styles.Container}`}>
      <div className={styles.modal}>
        <ul>
          {roomInfo.roomMode === 'rank' ? (
            <Avatar
              {...{
                userId: roomInfo.roomUsers[0].id,
                size: 0.6 * 300,
                location: 'Room',
                options: {
                  nickname: roomInfo.roomUsers[0].nickname,
                  isNest: true,
                },
              }}
            />
          ) : roomInfo.roomMode === 'normal' ? (
            roomInfo.roomUsers.map((member) => (
              <li key={member.id} className={'FontM32'}>
                <div className={styles.FlexContainer}>
                  <div>{member.nickname}</div>
                  <div>{member.isAlive === '' ? '생존 😊' : '탈락 🍗'}</div>
                </div>
              </li>
            ))
          ) : null}
        </ul>
      </div>
      <button className={`FontM20 ${styles.Btn}`} onClick={() => setRankOpen(false)}>
        확인
      </button>
    </div>
  );
};

export default GameRankModal;
