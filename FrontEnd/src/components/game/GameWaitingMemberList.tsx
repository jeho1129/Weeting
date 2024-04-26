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
                  {/* 방장 표시 로직은 여기에 추가할 수 있습니다. 예: index === 0 ? '방장' : '참가자' */}
                  {index === 0 ? '방장' : `${member.nickname}`} 
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