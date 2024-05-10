import styles from '@/styles/game/GameWaiting.module.css';
import { RoomInfo } from '@/types/game';
import waiting from '@/assets/images/ingamewaiting.png';
import ready from '@/assets/images/ingameready.png';
import crown from '@/assets/images/crown.png';
import ok from '@/assets/images/ingamewordfinish.png';
import choosing from '@/assets/images/ingamewordchoosing.png';
import firstIcon from '@/assets/images/ingamefirstscore.png';
import scoreIcon from '@/assets/images/ingamescore.png';
import { gameState } from '@/recoil/atom';
import { useRecoilValue } from 'recoil';

const GameWaitingMemberList = ({
  roomMode,
  roomStatus,
  roomMaxCnt,
  roomUsers,
}: {
  roomMode: RoomInfo['roomMode'];
  roomStatus: RoomInfo['roomStatus'];
  roomMaxCnt: RoomInfo['roomMaxCnt'];
  roomUsers: RoomInfo['roomUsers'];
}) => {
  const gameInfo = useRecoilValue(gameState)
  const sortedMembers = gameInfo.roomStatus === 'start' ? [...gameInfo.roomUsers].sort((a, b) => b.score - a.score) : gameInfo.roomUsers;

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
                <div className={styles.Nickname}>
                  {roomStatus === 'wordsetting' ? (
                    <img
                      src={member.word ? ok : choosing}
                      alt={member.ready ? '레디' : '대기중'}
                      className={styles.StatusIcon}
                    />
                  ) : roomStatus === 'start' && roomMode === 'rank' ? (
                    <>
                      <span className={styles.Score}>{member.score}</span>
                      <img
                        src={index === 0 ? firstIcon : scoreIcon}
                        alt={index === 0 ? '첫 번째' : '퍼센트'}
                        className={styles.StatusIcon}
                      />
                    </>
                  ) : roomStatus === 'start' && roomMode === 'normal' ? (
                    <>
                      <span className={styles.Score}>{member.isAlive ? '생존 😊' : '탈락 🍗'}</span>
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
