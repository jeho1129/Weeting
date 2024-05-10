import avatar from '@/assets/images/inGameAvatar.png';
import avatardead from '@/assets/images/inGameDead.png';
import avatarshock from '@/assets/images/inGameElectricShock.png';
import Avatar from '@/components/avatar/Avatar';

import styles from '@/styles/game/GameWaitingAvatar.module.css';
import { RoomInfo } from '@/types/game';
import { ChatMessage } from '@/types/chat';

import forbiddenFlag from '@/assets/images/forbiddenFlag.png';
import { useRecoilValue } from 'recoil';
import { gameState } from '@/recoil/atom';
import { useEffect, useState } from 'react';

const GameMessage = ({
  index, // 여기에 index를 추가합니다.
  top,
  left,
  latestMessage,
  sendTime,
}: {
  index: number; // index 타입을 number로 선언합니다.
  top: string;
  left: string;
  latestMessage: string;
  sendTime: string;
}) => {
  const [isOut, setIsOut] = useState(false);

  useEffect(() => {
    setIsOut(false);
    setTimeout(() => {
      setIsOut(true);
    }, 100);
  }, [sendTime]);

  const messageClassName = isOut
    ? index % 2 === 0
      ? styles.MsgOut
      : styles.MsgOutUnder
    : index % 2 === 0
      ? styles.MsgIn
      : styles.MsgInUnder;

  return (
    <>
      <div
        style={{
          top: `calc(${top} + 32%)`,
          left: `calc(${left} - 4.6%)`,
          position: 'absolute',
        }}
      >
        <div
          style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: `14ch`,
          }}
        >
          <div className={messageClassName} style={{ maxWidth: `320px` }}>
            {latestMessage}
          </div>
        </div>
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
    let top = '15.5%';
    if (index % 2 !== 0) {
      top = '72%';
    }
    let left = '0';
    switch (maxCount) {
      case 4:
        left = `calc(${((index % 2 === 0 ? index : index - 1) / 2) * 40}% + 20%)`;
        top = `${index % 2 === 0 ? 20 : 77}%`;
        break;
      case 6:
        left = `calc(${((index % 2 === 0 ? index : index - 1) / 2) * 30}% + 10%)`;
        if (index >= 2 && index <= 3) {
          top = `calc(${top} + 5%)`;
        } else {
          top = `${index % 2 === 0 ? 18.8 : 75}%`;
        }
        break;
      case 8:
        left = `${((index % 2 === 0 ? index : index - 1) / 2) * 26}%`;
        if (index >= 2 && index <= 5) {
          top = `calc(${top} + 5%)`;
        } else {
          top = `${index % 2 === 0 ? 18 : 74.5}%`;
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
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {/* 아바타 */}
              <div
                key={member.userId}
                style={{
                  position: 'absolute',
                  top: `calc(${position.top} - 14%)`,
                  left: `calc(${position.left} - 5.5%)`,
                }}
              >
                <Avatar
                  {...{
                    userId: member.userId,
                    size: 0.7 * 300,
                    location: 'Ingame',
                    options: {
                      nickname: member.nickname,
                      isAlive: member.isAlive == '' ? true : false,
                      isNest: index === 0 ? true : false,
                    },
                  }}
                />
              </div>

              {latestMessage === undefined ? (
                <></>
              ) : (
                <GameMessage
                  index={index} // index 값을 GameMessage 컴포넌트에 전달합니다.
                  top={index % 2 === 0 ? position.top : `calc(${position.top} - 40%)`}
                  left={position.left}
                  latestMessage={latestMessage}
                  sendTime={new Date().toISOString()}
                />
              )}
            </div>

            {roomStatus === 'start' && (
              <>
                <div>
                  <div
                    className={styles.inGameAvatar}
                    style={{
                      top: index % 2 === 0 ? `calc(${position.top} - 15%)` : `calc(${position.top} + 25%)`,
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
