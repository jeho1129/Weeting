import Avatar from '@/components/avatar/Avatar';

import styles from '@/styles/game/GameWaitingAvatar.module.css';
import { RoomInfo } from '@/types/game';
import { ChatMessage } from '@/types/chat';

import forbiddenFlag from '@/assets/images/forbiddenFlag.png';
import { useEffect, useState } from 'react';
import { userState } from '@/recoil/atom';
import { useRecoilValue } from 'recoil';

const GameMessage = ({
  index,
  top,
  left,
  latestMessage,
  sendTime,
}: {
  index: number;
  top: string;
  left: string;
  latestMessage: string;
  sendTime: string;
}) => {
  const [isOut, setIsOut] = useState(false);


  //1분간 타자 안치면 죽이는거 구현해야함
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
  const calculatePosition = (index: number, maxCount: number) => {
    let position;
    // let top = '15.5%';
    let top = '60px';
    if (index % 2 !== 0) {
      // top = '72%';
      top = '350px';
    }
    let left = '0px';
    switch (maxCount) {
      case 4:
        left = `calc(${((index % 2 === 0 ? index : index - 1) / 2) * 290}px + 143px)`;
        // left = `calc(${((index % 2 === 0 ? index : index - 1) / 2) * 40}% + 20%)`;

        // top = `${index % 2 === 0 ? 20 : 77}%`;
        top = `${index % 2 === 0 ? 90 : 375}px`;

        break;
      case 6:
        left = `calc(${((index % 2 === 0 ? index : index - 1) / 2) * 216}px + 72px)`;
        // left = `calc(${((index % 2 === 0 ? index : index - 1) / 2) * 30}% + 10%)`;
        if (index >= 2 && index <= 3) {
          // top = `calc(${top} + 5%)`;
          top = `calc(${top} + 30px)`;
        } else {
          // top = `${index % 2 === 0 ? 18.8 : 75}%`;
          top = `${index % 2 === 0 ? 80 : 372}px`;
        }
        break;
      case 8:
        // left = `${((index % 2 === 0 ? index : index - 1) / 2) * 26}%`;
        left = `${((index % 2 === 0 ? index : index - 1) / 2) * 185}px`;
        if (index >= 2 && index <= 5) {
          // top = `calc(${top} + 5%)`;
          top = `calc(${top} + 30px)`;
        } else {
          // top = `${index % 2 === 0 ? 18 : 74.5}%`;
          top = `${index % 2 === 0 ? 80 : 365}px`;
        }
        break;
    }

    position = { top, left };
    return position;
  };

  const [updatedRoomUsers, setUpdatedRoomUsers] = useState(roomUsers);
  const userInfo = useRecoilValue(userState);

  //////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    const updatedUsers = roomUsers.map((member) => {
      const userMessages = chatMessage.filter((msg) => msg.userId === member.id);
      const latestMessage = userMessages[userMessages.length - 1]?.content;

      if (latestMessage && latestMessage.includes(member.word!) && roomStatus === 'start') {
        return { ...member, isAlive: new Date().toLocaleTimeString() };
      } else {
        return member;
      }
    });
    // console.log(updatedUsers);

    // websocket 가져와서 여기 바꾸기

    setUpdatedRoomUsers(updatedUsers);
  }, [chatMessage, roomUsers]);
  ////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className={styles.inGameAvatars}>
      {updatedRoomUsers.map((member, index) => {
        const position = calculatePosition(index, roomMaxCnt);
        const userMessages = chatMessage.filter((msg) => msg.userId === member.id);
        const latestMessage = userMessages[userMessages.length - 1]?.content;
        const latestSendTime = userMessages[userMessages.length - 1]?.sendTime;

        return (
          <div key={`${member.id}-${index}`}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {/* 아바타 */}
              <div
                key={member.id}
                style={{
                  position: 'absolute',
                  top: `calc(${position.top} - 60px)`,
                  // top: `calc(${position.top} - 14%)`,
                  left: `calc(${position.left} - 70px)`,
                  // left: `calc(${position.left} - 5.5%)`,
                }}
              >
                <Avatar
                  {...{
                    userId: member.id,
                    size: 0.7 * 300,
                    location: 'Ingame',
                    options: {
                      nickname: member.nickname,
                      isAlive: member.isAlive === '' ? true : false,
                      isNest: index === 0 ? true : false,
                    },
                  }}
                />
              </div>
              {member.isAlive === '' && latestMessage !== undefined ? (
                <GameMessage
                  index={index}
                  top={index % 2 === 0 ? position.top : `calc(${position.top} - 200px)`}
                  // top={index % 2 === 0 ? position.top : `calc(${position.top} - 40%)`}
                  left={position.left}
                  latestMessage={latestMessage}
                  sendTime={latestSendTime}
                />
              ) : null}
            </div>

            {roomStatus === 'start' && (
              <>
                <div>
                  <div
                    className={styles.inGameAvatar}
                    style={{
                      top: index % 2 === 0 ? `calc(${position.top} - 50px)` : `calc(${position.top} + 138px)`,
                      // top: index % 2 === 0 ? `calc(${position.top} - 15%)` : `calc(${position.top} + 25%)`,
                      left: position.left,
                      position: 'absolute',
                    }}
                  >
                    <div
                      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}
                    >
                      {member.id !== userInfo.userId ? (
                        <>
                          <div className={`FontM20 ${styles.wordCenter}`}>{member.word}</div>
                          <img src={forbiddenFlag} alt="forbidden word" />
                        </>
                      ) : null}
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
