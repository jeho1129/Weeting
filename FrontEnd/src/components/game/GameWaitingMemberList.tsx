import styles from '@/styles/game/GameWaiting.module.css';

const GameWaitingMemberList = () => {
  return (
    <>
        <div className={styles.Box}>
            <div className={styles.List}>
              <div className={styles.RoomMemberCount}>
                <div>
                  참가자 목록
                </div>
                <div>
                  {/* {memberlist.length} */} 현재 / 정원
                </div>
              </div>
                <div className={styles.RoomMembers}>
                  <div>
                    방장
                  </div>
                  <div className={styles.RoomMember}>
                    <div>
                      참가자
                    </div>
                    <div>
                      레디
                    </div>
                  </div>
                </div>
            </div>
        </div>
    </>
  );
};

export default GameWaitingMemberList;
