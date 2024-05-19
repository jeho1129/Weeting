import styles from '@/styles/game/GameEnd.module.css';
import { RoomInfo } from '@/types/game';

interface GameRankModalProps {
  roomInfo: RoomInfo;
  isRankOpen: boolean;
  setRankOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const GameRankModal = ({ roomInfo, isRankOpen, setRankOpen }: GameRankModalProps) => {
  if (!isRankOpen) {
    return <></>;
  }
  const sortedMembers =
    roomInfo.roomStatus === 'start' ? [...roomInfo.roomUsers].sort((a, b) => b.score - a.score) : roomInfo.roomUsers;
  console.log(roomInfo);
  console.log(sortedMembers);

  return (
    <>
      <div className={`FontM20 ${styles.Container}`}>
        <div className={styles.modal}>
          <div className={styles.RoomUsers}>
            {sortedMembers.map((member, index) => (
              <div key={member.id} className={styles.RoomMember}>
                <div className={styles.Nickname}>{member.nickname}</div>
                <div>{roomInfo.roomStatus === 'end' ? <span className={styles.Score}>{member.score}</span> : null}</div>
                {/* <div className={styles.Nickname}>
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
                </div> */}
              </div>
            ))}
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
  //   const normalMembers = roomInfo.roomUsers;
  //   const sortedMembers = [...roomInfo.roomUsers].sort((a, b) => b.score - a.score);

  //   return (
  //     <div className={`FontM20 ${styles.Container}`}>
  //       <div className={styles.modal}>
  //         <ul>
  //           {roomInfo.roomMode === 'rank'
  //             ? sortedMembers.map((member, index) => (
  //                 <li key={member.id} className={index === 0 ? 'FontM32' : ''}>
  //                   <div className={styles.Center}>
  //                     {index === 0 ? ' 1등 ' : `${index + 1}등`} {member.nickname}
  //                   </div>
  //                   <div className={styles.Center}>점수: {member.score}</div>
  //                 </li>
  //               ))
  //             : roomInfo.roomMode === 'normal'
  //               ? normalMembers.map((member) => (
  //                   <li key={member.id} className={'FontM32'}>
  //                     <div className={styles.FlexContainer}>
  //                       <div>{member.nickname}</div>
  //                       <div>{member.isAlive === '' ? '생존 😊' : '탈락 🍗'}</div>
  //                     </div>
  //                   </li>
  //                 ))
  //               : null}
  //         </ul>
  //       </div>
  //       <button className={`FontM20 ${styles.Btn}`} onClick={() => setRankOpen(false)}>
  //         확인
  //       </button>
  //     </div>
  //   );
  // };
};
export default GameRankModal;
