import styles from '@/styles/game/GameWaiting.module.css';
import { RoomInfo } from '@/types/game';
import waiting from '@/assets/images/waiting.png';
import ready from '@/assets/images/ready.png';
import crown from '@/assets/images/crown.png';
import ok from '@/assets/images/ok.png';
import choosing from '@/assets/images/choosing.png';
import firstIcon from '@/assets/images/firstscore.png';
import scoreIcon from '@/assets/images/otherscore.png';

const GameWaitingMemberList = ({
  roomStatus,
  roomMaxCnt,
  roomUsers,
}: {
  roomStatus: RoomInfo['roomStatus'];
  roomMaxCnt: RoomInfo['roomMaxCnt'];
  roomUsers: RoomInfo['roomUsers'];
}) => {
  const sortedMembers = roomStatus === 'start' ? [...roomUsers].sort((a, b) => b.score - a.score) : roomUsers;

  return (
    <>
      <div className={styles.Box}>
        <div className={styles.List}>
          <div className={`FontM32 ${styles.RoomMemberCount}`}>
            <div>참가자 목록</div>
            <div>
              {sortedMembers.length} / {roomMaxCnt} 명
            </div>
          </div>
          <div className={styles.RoomUsers}>
            {sortedMembers.map((member, index) => (
              <div key={member.userId} className={styles.RoomMember}>
                <div className={styles.Nickname}>
                  {index === 0 && roomStatus !== 'start' ? (
                    <>
                      {member.nickname}
                      <img src={crown} alt="방장" className={styles.CrownIcon} />
                    </>
                  ) : (
                    `${member.nickname}`
                  )}
                </div>
                <div>
                  {roomStatus === 'wordsetting' ? (
                    <img
                      src={member.word ? ok : choosing}
                      alt={member.ready ? '레디' : '대기중'}
                      className={styles.StatusIcon}
                    />
                  ) : roomStatus === 'start' ? (
                    <>
                      <span className={styles.Score}>{member.score}</span>
                      <img
                        src={index === 0 ? firstIcon : scoreIcon}
                        alt={index === 0 ? '첫 번째' : '퍼센트'}
                        className={styles.StatusIcon}
                      />
                    </>
                  ) : (
                    <img
                      src={member.ready ? ready : waiting}
                      alt={member.ready ? '레디' : '대기중'}
                      className={styles.StatusIcon}
                    />
                  )}
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
