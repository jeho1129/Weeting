import avatar from '@/assets/images/inGameAvatar.png';
import avatardead from '@/assets/images/inGameDead.png';
import avatarshock from '@/assets/images/inGameElectricShock.png';

import styles from '@/styles/game/GameWaitingAvatar.module.css';
import { RoomInfo } from '@/types/game';
import { ChatMessage } from '@/types/chat';

import forbiddenFlag from '@/assets/images/forbiddenFlag.png';
import { useRecoilValue } from 'recoil';
import { gameState } from '@/recoil/atom';
import { useEffect, useState } from 'react';

interface Position {
  top: string;
  left: string;
}
const GameMessage = ({ top, left, latestMessage }: { top: string; left: string; latestMessage: string }) => {
  const [isOut, setIsOut] = useState(false);
  useEffect(() => {
    setIsOut(false);
    setTimeout(() => {
      setIsOut(true);
    }, 100);
  }, [latestMessage]);
  return (
    <>
      <div
        style={{ top: `calc(${top} + 32%)`, left: `calc(${left} + 1%)`, position: 'absolute' }}
        className={isOut ? styles.messageFadeOut : styles.messageIn}
      >
        {latestMessage}
      </div>
    </>
  );
};

const GameWaitingAvatars = ({
  roomStatus,
  roomUsers,
  roomMaxCnt,
  chatMessage,
}: {
  roomStatus: RoomInfo['roomStatus'];
  roomUsers: RoomInfo['roomUsers'];
  roomMaxCnt: RoomInfo['roomMaxCnt'];
  chatMessage: ChatMessage[];
}) => {
  const gameInfo = useRecoilValue(gameState);
  const calculatePosition = (index: number, maxCount: number) => {
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
        const userMessages = chatMessage.filter((msg) => msg.userId === member.userId);
        const latestMessage = userMessages[userMessages.length - 1]?.content;
        return (
          <div key={member.userId}>
            <img
              key={member.userId}
              src={gameInfo.roomUsers.filter((it) => it.userId === member.userId)[0].isAlive ? avatar : avatardead}
              alt="avatar"
              className={styles.inGameAvatar}
              style={{ top: position.top, left: position.left }}
            />
            <GameMessage top={position.top} left={position.left} latestMessage={latestMessage} />

            {/* <div
              style={{ top: `calc(${position.top} + 32%)`, left: `calc(${position.left} + 1%)`, position: 'absolute' }}
              className={styles.messageFadeOut}
            >
              {latestMessage}
            </div> */}

            {roomStatus === 'start' && (
              <>
                <div>
                  <div
                    className={styles.inGameAvatar}
                    style={{
                      top: index % 2 === 0 ? `calc(${position.top} - 12%)` : `calc(${position.top} + 25%)`, // 조건에 따라 top 위치 조정
                      left: position.left,
                      position: 'absolute',
                    }}
                  >
                    <div
                      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}
                    >
                      <div className={`FontM20 ${styles.wordCenter}`}>{member.word}</div>
                      <img src={forbiddenFlag} alt="forbidden word" />
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
