import React from 'react'
import styles from '@/styles/game/GameWaiting.module.css';
import electricpole from '@/assets/images/electricpole.png';
import avatar from '@/assets/images/inGameAvatar.png';

const GameWaitingPole = ({roommembers}: { roommembers: RoomInfo["roommembers"] }) => {
  return (
    <>
    {roommembers.map((member, index) => (
              <div key={member.memberid} className={styles.RoomMember}>
                <div>
                  {index === 0 ? '방장' : `${member.nickname}`} 
                </div>
                <div>
                  {member.ready ? '레디' : '대기중'}
                </div>
              </div>
            ))}
      <div>
        <img className={styles.inGameAvatar} src={avatar} alt="avatar" />
      </div>
      <img className={styles.ElectricPole} src={electricpole} alt="GameTemplate" />
    </>
  );
};

export default GameWaitingPole;

// import React from 'react';
// import styles from '@/styles/game/GameWaiting.module.css';
// import electricpole from '@/assets/images/electricpole.png';
// import avatar from '@/assets/images/inGameAvatar.png';

// const GameWaitingPole = ({ roommembers }: { roommembers: RoomInfo["roommembers"] }) => {
//   return (
//     <>
//       {roommembers.map((member, index) => (
//         <div key={member.memberid} className={styles.MemberContainer}>
//           <img className={styles.inGameAvatar} src={avatar} alt="avatar" />
//           <div className={styles.MemberInfo}>
//             <span>{member.memberid}</span>
//             <span>{member.outfit}</span>
//           </div>
//         </div>
//       ))}
//       <img className={styles.ElectricPole} src={electricpole} alt="GameTemplate" />
//     </>
//   );
// };

// export default GameWaitingPole;
