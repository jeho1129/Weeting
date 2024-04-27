import styles from '@/styles/game/GameWaiting.module.css';
import { RoomInfo } from '@/types/game';

const GameWaitingMemberList = ({roommembers}: { roommembers: RoomInfo["roommembers"] }) => {
  return (
    <>
        <div className={styles.Box}>
            <div className={styles.List}>
              <div className={styles.RoomMemberCount}>
                <div>
                  참가자 목록
                </div>
                <div>
                  {roommembers.length} / 정원
                </div>
              </div>
              <div className={styles.RoomMembers}>
            {roommembers.map((member, index) => (
              <div key={member.memberid} className={styles.RoomMember}>
                <div>
                  {index === 0 ? `${member.nickname} 방장` : `${member.nickname}`} 
                </div>
                <div>
                  {member.ready ? '레디' : '대기중'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default GameWaitingMemberList;