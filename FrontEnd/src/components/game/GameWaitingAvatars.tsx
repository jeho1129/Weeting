import React from 'react';
import avatar from '@/assets/images/inGameAvatar.png';
import styles from '@/styles/game/GameWaitingAvatar.module.css';
import { RoomInfo } from '@/types/game';

const GameWaitingAvatars = ({ roommembers, roommaxcnt }: { roommembers: RoomInfo["roommembers"], roommaxcnt: RoomInfo["roommaxcnt"] }) => {
  const calculatePosition = (index, maxCount) => {
    let position;
    let top = "15%";
    
    if (index % 2 !== 0) {
      top = "65%";
    }
    let left = "0";
    switch (maxCount) {
      case 8:
        // 8명일 때, index % 2로 행을 나누고, index / 2 또는 (index - 1) / 2로 열을 계산
        left = `${(index % 2 === 0 ? index : index - 1) / 2 * 25}%`; // 각 열 사이의 간격을 25%로 설정
        break;
      // 다른 maxCount 값에 대한 계산 로직 추가 가능
    }

    position = { top, left };
    return position;
  };

  return (
    <div className={styles.inGameAvatars}>
      {roommembers.map((member, index) => { 
        const position = calculatePosition(index, roommaxcnt);
        return (
          <img
            key={member.memberid}
            src={avatar}
            alt="avatar"
            className={styles.inGameAvatar}
            style={{ top: position.top, left: position.left }}
          />
        );
      })}
    </div>
  );
};

export default GameWaitingAvatars;
