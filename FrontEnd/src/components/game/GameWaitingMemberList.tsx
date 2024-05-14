import styles from '@/styles/game/GameWaiting.module.css';
import { RoomInfo } from '@/types/game';
import waiting from '@/assets/images/ingamewaiting.png';
import ready from '@/assets/images/ingameready.png';
import crown from '@/assets/images/crown.png';
import ok from '@/assets/images/ingamewordfinish.png';
import choosing from '@/assets/images/ingamewordchoosing.png';
import firstIcon from '@/assets/images/ingamefirstscore.png';
import scoreIcon from '@/assets/images/ingamescore.png';
import leader from '@/assets/images/leader.png';

const GameWaitingMemberList = ({ roomInfo }: { roomInfo: RoomInfo }) => {
  const sortedMembers =
    roomInfo.roomStatus === 'start' ? [...roomInfo.roomUsers].sort((a, b) => b.score - a.score) : roomInfo.roomUsers;

  return (
    <>
      <div className={styles.Box}>
        <div className={styles.List}>
          <div className={`FontM32 ${styles.RoomMemberCount}`}>
            <div>참가자 목록　</div>
            <div>
              {sortedMembers.length} / {roomInfo.roomMaxCnt} 명
            </div>
          </div>
          <div className={styles.RoomUsers}>
            {sortedMembers.map((member, index) => (
              <div key={member.id} className={styles.RoomMember}>
                <div className={styles.Nickname}>
                  {index === 0 && roomInfo.roomStatus !== 'start' ? (
                    <>
                      {member.nickname}
                      <img src={crown} alt="방장" className={styles.CrownIcon} />
                    </>
                  ) : (
                    `${member.nickname}`
                  )}
                </div>
                <div className={styles.Nickname}>
                  {roomInfo.roomStatus === 'wordsetting' ? (
                    <img
                      src={member.word ? ok : choosing}
                      alt={member.ready ? '레디' : '대기중'}
                      className={styles.StatusIcon}
                    />
                  ) : roomInfo.roomStatus === 'start' && roomInfo.roomMode === 'rank' ? (
                    <>
                      <span className={styles.Score}>{member.score}</span>
                      <img
                        src={index === 0 ? firstIcon : scoreIcon}
                        alt={index === 0 ? '첫 번째' : '퍼센트'}
                        className={styles.StatusIcon}
                      />
                    </>
                  ) : roomInfo.roomStatus === 'start' && roomInfo.roomMode === 'normal' ? (
                    <>
                      <div style={{ height: '27px' }}>
                        <span className={styles.Alive}>{member.isAlive === '' ? '생존 😊' : '탈락 🍗'}</span>
                      </div>
                    </>
                  ) : (
                    <>
                      {index === 0 ? (
                        <img src={leader} alt="방장" className={styles.StatusIcon} />
                      ) : (
                        <img
                          src={member.ready ? ready : waiting}
                          alt={member.ready ? '레디' : '대기중'}
                          className={styles.StatusIcon}
                        />
                      )}
                    </>
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
