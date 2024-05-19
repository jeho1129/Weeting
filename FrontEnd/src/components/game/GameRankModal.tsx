import styles from '@/styles/game/GameEnd.module.css';
import { RoomInfo, FinalMember } from '@/types/game';
import { gameFinalRankApi } from '@/services/gameApi';
import { useState, useEffect } from 'react';
interface GameRankModalProps {
  roomInfo: RoomInfo;
  isRankOpen: boolean;
  setRankOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

// const GameRankModal = ({ roomInfo, isRankOpen, setRankOpen }: GameRankModalProps) => {
//   if (!isRankOpen) {
//     return <></>;
//   }
//   const sortedMembers =
//     roomInfo.roomStatus === 'end' ? [...roomInfo.roomUsers].sort((a, b) => b.score - a.score) : roomInfo.roomUsers;

//   const normalMembers = roomInfo.roomUsers;

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

// export default GameRankModal;
const GameRankModal = ({ roomInfo, isRankOpen, setRankOpen }: GameRankModalProps) => {
  const [members, setMembers] = useState<FinalMember[]>([]);
  useEffect(() => {
    const finalModal = async () => {
      if (roomInfo.roomStatus === 'end') {
        const finalData = await gameFinalRankApi(roomInfo.roomId);
        setMembers(finalData);
      }
    };
    finalModal();
  }, [roomInfo]);

  if (!isRankOpen) {
    return <></>;
  }

  return (
    <div className={`FontM20 ${styles.Container}`}>
      <div className={styles.modal}>
        <ul>
          {roomInfo.roomMode === 'rank'
            ? members.map((member, index) => (
                <li key={member.id} className={index === 0 ? 'FontM32' : ''}>
                  <div className={styles.Center}>
                    {index === 0 ? '1등' : `${index + 1}등`} {member.nickname}
                  </div>
                  <div className={styles.Center}>점수: {member.score}</div>
                </li>
              ))
            : roomInfo.roomMode === 'normal'
              ? members.map((member) => (
                  <li key={member.id} className={'FontM32'}>
                    <div className={styles.FlexContainer}>
                      <div>{member.nickname}</div>
                      <div>{member.isAlive ? '생존 😊' : '탈락 🍗'}</div>
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
