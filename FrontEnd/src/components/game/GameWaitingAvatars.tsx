import avatar from '@/assets/images/inGameAvatar.png';
import avatardead from '@/assets/images/inGameDead.png';
import avatarshock from '@/assets/images/inGameElectricShock.png';

import styles from '@/styles/game/GameWaitingAvatar.module.css';
import { RoomInfo } from '@/types/game';
import forbiddenFlag from '@/assets/images/forbiddenFlag.png';

const GameWaitingAvatars = ({
	roomStatus,
  roomUsers,
  roomMaxCnt,
}: {
	roomStatus: RoomInfo['roomStatus'];
  roomUsers: RoomInfo['roomUsers'];
  roomMaxCnt: RoomInfo['roomMaxCnt'];
}) => {
  const calculatePosition = (index, maxCount) => {
    let position;
    let top = '14.5%';
    if (index % 2 !== 0) {
      top = '63%';
    }
    let left = '0';
    switch (maxCount) {
      case 4:
        left = `calc(${((index % 2 === 0 ? index : index - 1) / 2) * 40}% + 20%)`;
        top = `${index % 2 === 0 ? 19 : 68}%`;
        break;
      case 6:
        left = `calc(${((index % 2 === 0 ? index : index - 1) / 2) * 30}% + 10%)`;
        if (index >= 2 && index <= 3) {
          top = `calc(${top} + 5%)`;
        } else {
          top = `${index % 2 === 0 ? 17.5 : 67}%`;
        }
        break;
      case 8:
        left = `${((index % 2 === 0 ? index : index - 1) / 2) * 26}%`;
        if (index >= 2 && index <= 5) {
          top = `calc(${top} + 5%)`;
        } else {
          top = `${index % 2 === 0 ? 16.5 : 66}%`;
        }
        break;
    }

    position = { top, left };
    return position;
  };

  return (
    <div className={styles.inGameAvatars}>
      {roomUsers.map((member, index) => {
        const position = calculatePosition(index, roomMaxCnt);
        return (
					<div key={member.userId}>
						<img
							key={member.userId}
							src={avatar}
							alt="avatar"
							className={styles.inGameAvatar}
							style={{ top: position.top, left: position.left }}
						/>
						{roomStatus === 'start' && (
              <>
              <div>
                <div className={styles.inGameAvatar}
                    style={{
                      top: index % 2 === 0 ? `calc(${position.top} - 12%)` : `calc(${position.top} + 25%)`, // 조건에 따라 top 위치 조정
                      left: position.left,
                      position: 'absolute',
                    }} >
                    <div style={{display:'flex', justifyContent:'center', alignItems:'center', position: 'relative'}}>
                      <div className={`FontM20 ${styles.wordCenter}`}>{member.word}</div>
                      <img
                        src={forbiddenFlag}
                        alt="forbidden word"
                      />
                    </div>
                </div>
              </div>
              </>
							)}
					</div>
        );
      })}
    </div>
  );
};

export default GameWaitingAvatars;