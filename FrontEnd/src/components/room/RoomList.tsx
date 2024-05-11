import watingAvatar from '@/assets/images/inGameAvatar.png';
import roomSign from '@/assets/images/roomSign.png';
import styles from '@/styles/room/RoomList.module.css';
import { RoomWaitInfo } from '@/types/room';
import { Lock } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const RoomList = ({ roomSelectedMode, searchValue }) => {
  const [serverResponseData, setServerResponseData] = useState<RoomWaitInfo>([]);
  const [webSocket, setWebSocket] = useState<WebSocket | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const ws = new WebSocket('ws://54.180.158.223:9002/ws/chatroom/list');

    ws.onopen = () => {
      console.log('리스트받아오자아');
    };
    // 서버로부터 메시지를 받는 이벤트 리스너 설정
    ws.onmessage = (event) => {
      const listedData: RoomWaitInfo[] = JSON.parse(event.data);
      setServerResponseData(listedData);
    };

    ws.onerror = (error) => {
      console.error('웹소켓 에러 발생:', error);
    };

    setWebSocket(ws);

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);

  useEffect(() => {
    console.log('serverResponseData :', serverResponseData);
  }, [serverResponseData]);

  const roomEnterHandler = async (
    roomId: string,
    roomPassword: string,
    roomUsersLength: number,
    roomMaxCnt: number,
  ) => {
    if (roomUsersLength >= roomMaxCnt) {
      Swal.fire({
        title: '방이 가득 찼습니다',
        icon: 'error',
      });
      return;
    }
    if (roomPassword === null) {
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
    <ul className={styles.ListGroup}>
      {/* 검색어가 없는 경우 */}
      {searchValue === '' &&
      serverResponseData.filter((room) => {
        console.log('roommm :', room);
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
              <div>
                <img src={watingAvatar} alt="waitingAvatar" className={styles.Avatar} />
              </div>
            </li>
          ))
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
          <div className="FontM32">방이 없어용~!</div>
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
            <li key={index} className={styles.OneRoom} onClick={() => roomEnterHandler(room.roomId)}>
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
              <div>
                <img src={watingAvatar} alt="waitingAvatar" className={styles.Avatar} />
              </div>
            </li>
          ))
      )}
    </ul>
  );
};

export default RoomList;
