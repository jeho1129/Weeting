import roomSign from '@/assets/images/roomSign.png';
import Avatar from '@/components/avatar/Avatar';
import { roomEnterApi } from '@/services/roomApi';
import styles from '@/styles/room/RoomList.module.css';
import { RoomWaitInfo } from '@/types/room';
import { buttonError } from '@/utils/buttonClick';
import { Lock } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const RoomList = ({ roomSelectedMode, searchValue }: { roomSelectedMode: number; searchValue: string }) => {
  const [serverResponseData, setServerResponseData] = useState<RoomWaitInfo[]>([]);
  // const [webSocket, setWebSocket] = useState<WebSocket | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // 채팅방 stomp client 연결
    // 로컬
    // const ws = new WebSocket('ws://localhost:8080/ws/chatroom/list');
    // 배포
    const ws = new WebSocket('wss://k10c103.p.ssafy.io/ws/chatroom/list');
    ws.onopen = () => {
      console.log('방리스트 받아오기 성공');
    };
    ws.onmessage = (event) => {
      const roomList = JSON.parse(event.data);
      console.log(roomList);
      setServerResponseData(roomList);
    };
    ws.onerror = (error) => {
      console.error('웹소켓 에러 발생:', error);
    };
    return () => {
      ws.close();
      console.log('웹소켓 연결종료');
    };
  }, [serverResponseData]);

  useEffect(() => {
    // console.log('serverResponseData :', serverResponseData);
  }, [serverResponseData]);

  const roomEnterHandler = async (
    roomId: string,
    roomPassword: string | null,
    roomUsersLength: number,
    roomMaxCnt: number,
  ) => {
    if (roomUsersLength >= roomMaxCnt) {
      buttonError();
      Swal.fire({
        title: '방이 가득 찼습니다',
        icon: 'error',
      });
      return;
    }
    if (roomPassword === null) {
      try {
        const response = await roomEnterApi(roomId);
        console.log(response);
      } catch (err) {
        console.log('err :', err);
      }
      navigate(`/room/${roomId}`);
    } else {
      const { value: password } = await Swal.fire({
        title: '방 비밀번호를 입력해주세요',
        input: 'password',
        inputPlaceholder: '숫자 4자리',
        inputAttributes: {
          maxlength: '4',
          autocapitalize: 'off',
          autocorrect: 'off',
        },
      });
      if (password === roomPassword) {
        navigate(`/room/${roomId}`);
      } else {
        buttonError();
        Swal.fire({
          title: '비밀번호가 일치하지 않습니다',
          icon: 'error',
        });
      }
    }
  };

  return (
    // roomSelectedMode에 따라서 다르게 보여주기
    // roomSelectedMode 0 = 전체, roomSelectedMode 1 = 노말, roomSelectedMode 2 = 랭크
    <div className={styles.ListGroup}>
      <ul className={styles.ListContainer}>
        {/* 검색어가 없는 경우 */}
        {searchValue === '' &&
        serverResponseData.filter((room) => {
          // console.log('roommm :', room);
          if (roomSelectedMode === 0)
            return true; // 모든 방 보기
          else if (roomSelectedMode === 1)
            return room.roomMode === 'normal'; // 노말 모드의 방만 보기
          else if (roomSelectedMode === 2)
            return room.roomMode === 'rank'; // 랭크 모드의 방만 보기
          else return false;
        }).length === 0 ? (
          <div className={styles.NoRoom}>
            <img src={roomSign} alt="roomSign" />
            <div className="FontM32">방이 없어요 . .</div>
          </div>
        ) : (
          searchValue === '' &&
          serverResponseData
            .filter((room) => {
              if (roomSelectedMode === 0)
                return true; // 모든 방 보기
              else if (roomSelectedMode === 1)
                return room.roomMode === 'normal'; // 노말 모드의 방만 보기
              else if (roomSelectedMode === 2)
                return room.roomMode === 'rank'; // 랭크 모드의 방만 보기
              else return false;
            })
            .map((room, index) =>
              room.roomUsers.length !== 0 ? (
                <li
                  key={index}
                  className={styles.OneRoom}
                  onClick={() =>
                    roomEnterHandler(room.roomId, room.roomPassword, room.roomUsers.length, room.roomMaxCnt)
                  }
                >
                  <div className={`${styles.FirstRow}`}>
                    <div className={`${styles.RoomName} FontM32`}>{room.roomName}</div>
                    <div className={`${styles.RoomUsers} FontM20`}>
                      {room.roomUsers.length}/{room.roomMaxCnt}
                    </div>
                    {room.roomPassword !== null ? <Lock className={styles.Lock} size={25} /> : <></>}
                  </div>
                  <div className={styles.SecondRow}>
                    <div></div>
                    {room.roomMode === 'rank' ? (
                      <div className={`${styles.Mode} ${styles.Rank} FontM20`}>랭크</div>
                    ) : (
                      <div className={`${styles.Mode} ${styles.Normal} FontM20`}>노말</div>
                    )}
                  </div>
                  <div className={styles.Avatar}>
                    <Avatar
                      {...{
                        userId: room.roomUsers[0].id,
                        size: 0.6 * 300,
                        location: 'Room',
                        options: {
                          nickname: room.roomUsers[0].nickname,
                          isNest: true,
                        },
                      }}
                    />
                  </div>
                </li>
              ) : (
                <div className={styles.NoRoom}>
                  <img src={roomSign} alt="roomSign" />
                  <div className="FontM32">방이 없어요 . .</div>
                </div>
              ),
            )
        )}

        {/* 검색어가 있는 경우 */}
        {searchValue !== '' &&
        serverResponseData.filter((room) => {
          if (roomSelectedMode === 0) {
            console.log('roomName :', room.roomName);
            return room.roomName.includes(searchValue); // 모든 방 보기
          } else if (roomSelectedMode === 1)
            return room.roomMode === 'normal' && room.roomName.includes(searchValue); // 노말 모드의 방만 보기
          else if (roomSelectedMode === 2)
            return room.roomMode === 'rank' && room.roomName.includes(searchValue); // 랭크 모드의 방만 보기
          else return false;
        }).length === 0 ? (
          <div className={styles.NoRoom}>
            <img src={roomSign} alt="roomSign" />
            <div className="FontM32">방이 없어요 . .</div>
          </div>
        ) : (
          searchValue !== '' &&
          serverResponseData
            .filter((room) => {
              if (roomSelectedMode === 0)
                return room.roomName.includes(searchValue); // 모든 방 보기
              else if (roomSelectedMode === 1)
                return room.roomMode === 'normal' && room.roomName.includes(searchValue); // 노말 모드의 방만 보기
              else if (roomSelectedMode === 2)
                return room.roomMode === 'rank' && room.roomName.includes(searchValue); // 랭크 모드의 방만 보기
              else return false;
            })
            .map((room, index) => (
              <li
                key={index}
                className={styles.OneRoom}
                onClick={() => roomEnterHandler(room.roomId, room.roomPassword, room.roomUsers.length, room.roomMaxCnt)}
              >
                <div className={`${styles.FirstRow}`}>
                  <div className={`${styles.RoomName} FontM32`}>{room.roomName}</div>
                  <div className={`${styles.RoomUsers} FontM20`}>
                    {room.roomUsers.length}/{room.roomMaxCnt}
                  </div>
                  {room.roomPassword !== null ? <Lock className={styles.Lock} size={25} /> : <></>}
                </div>
                <div className={styles.SecondRow}>
                  <div></div>
                  {room.roomMode === 'rank' ? (
                    <div className={`${styles.Mode} ${styles.Rank} FontM20`}>랭크</div>
                  ) : (
                    <div className={`${styles.Mode} ${styles.Normal} FontM20`}>노말</div>
                  )}
                </div>
                <div className={styles.Avatar}>
                  <Avatar
                    {...{
                      userId: room.roomUsers[0].id,
                      size: 0.6 * 300,
                      location: 'Room',
                      options: {
                        nickname: room.roomUsers[0].nickname,
                        isNest: true,
                      },
                    }}
                  />
                </div>
              </li>
            ))
        )}
      </ul>
    </div>
  );
};

export default RoomList;
