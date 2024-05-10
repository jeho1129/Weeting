import watingAvatar from '@/assets/images/inGameAvatar.png';
import roomSign from '@/assets/images/roomSign.png';
import styles from '@/styles/room/RoomList.module.css';
import { RoomWaitData } from '@/types/roomWaitData';
import { Lock } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RoomWaitInfo } from '@/types/room';

const RoomList = ({ roomSelectedMode, searchValue }) => {
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [chatRooms, setChatRooms] = useState([]);
  const [serverResponseData, setServerResponseData] = useState<RoomWaitInfo>([]);
  const [webSocket, setWebSocket] = useState<WebSocket | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080/ws/chatroom/list');

    ws.onopen = () => {
      console.log('리스트받아오자아');
    };
    // 서버로부터 메시지를 받는 이벤트 리스너 설정
    ws.onmessage = (event) => {
      const listedData: RoomWaitInfo[] = JSON.parse(event.data)
      setServerResponseData(listedData)

      // const msg: { nickname: string; highest_simialrity: number } = JSON.parse(score.data);
      // console.log(score.data);

      // 서버로부터 받은 메시지를 상태에 저장
      // setServerResponse((prevList) => [
      //   ...prevList,
      //   {
      //     nickname: msg.nickname,
      //     highest_simialrity: msg.highest_simialrity,
      //   },
      // ]);
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
    console.log("serverResponseData :", serverResponseData)
  }, [serverResponseData])

  const roomEnterHandler = (roomId: string) => {
    navigate(`/room/${roomId}`);
  };

  return (
    // roomSelectedMode에 따라서 다르게 보여주기
    // roomSelectedMode 0 = 전체, roomSelectedMode 1 = 노말, roomSelectedMode 2 = 랭크
    <ul className={styles.ListGroup}>
      {/* 검색어가 없는 경우 */}
      {searchValue === '' && serverResponseData.filter((room) => {
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
          <div className="FontM32">방이 없어용~!</div>
        </div>
      ) : (
        searchValue === '' && serverResponseData.filter((room) => {
          if (roomSelectedMode === 0)
            return true; // 모든 방 보기
          else if (roomSelectedMode === 1)
            return room.roomMode === 'normal'; // 노말 모드의 방만 보기
          else if (roomSelectedMode === 2)
            return room.roomMode === 'rank'; // 랭크 모드의 방만 보기
          else return false;
        }).map((room, index) => (
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

      {/* 검색어가 있는 경우 */}
      {searchValue !== '' && serverResponseData.filter((room) => {
        if (roomSelectedMode === 0){
          console.log('roomName :', room.roomName)
          return (searchValue === room.roomName); // 모든 방 보기
        }
        else if (roomSelectedMode === 1)
          return (room.roomMode === 'normal' && searchValue === room.roomName); // 노말 모드의 방만 보기
        else if (roomSelectedMode === 2)
          return (room.roomMode === 'rank' && searchValue === room.roomName); // 랭크 모드의 방만 보기
        else return false;
      }).length === 0 ? (
        <div className={styles.NoRoom}>
          <img src={roomSign} alt="roomSign" />
          <div className="FontM32">방이 없어용~!</div>
        </div>
      ) : (
        searchValue !== '' && serverResponseData.filter((room) => {
          if (roomSelectedMode === 0)
            return (searchValue === room.roomName); // 모든 방 보기
          else if (roomSelectedMode === 1)
            return (room.roomMode === 'normal' && searchValue === room.roomName); // 노말 모드의 방만 보기
          else if (roomSelectedMode === 2)
            return (room.roomMode === 'rank' && searchValue === room.roomName); // 랭크 모드의 방만 보기
          else return false;
        }).map((room, index) => (
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
