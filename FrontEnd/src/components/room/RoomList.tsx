import watingAvatar from '@/assets/images/inGameAvatar.png';
import roomSign from '@/assets/images/roomSign.png';
import styles from '@/styles/room/RoomList.module.css';
import { RoomWaitData } from '@/types/roomWaitData';
import { Lock } from '@phosphor-icons/react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const RoomList = ({ roomSelectedMode }) => {
  const [roomName, setRoomName] = useState('');
  const [chatRooms, setChatRooms] = useState([]);

  const navigate = useNavigate();

  //axios 및 웹소켓 연결되면 풀기
  //   useEffect(() => {
  //     findAllRoom();
  //   }, []);

  //   const findAllRoom = async () => {
  //     try {
  //       const response = await axios.get('/chat/rooms');
  //       // HTML을 방지하고 JSON 배열만 허용
  //       if (Object.prototype.toString.call(response.data) === "[object Array]") {
  //         setChatRooms(response.data);
  //       }
  //     } catch (error) {
  //       console.error("채팅방 목록 로드 실패", error);
  //     }
  //   };
  const roomEnterHandler = (roomId: string) => {
    navigate(`/room/${roomId}`);
  };

  return (
    // roomSelectedMode에 따라서 다르게 보여주기
    // roomSelectedMode 0 = 전체, roomSelectedMode 1 = 노말, roomSelectedMode 2 = 랭크
    <ul className={styles.ListGroup}>
      {RoomWaitData.filter((room) => {
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
          {/* <img src={roomBird} alt="roomSign" /> */}
          <div className="FontM32">방이 없어용~!</div>
        </div>
      ) : (
        RoomWaitData.filter((room) => {
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
            <Link to={`/rooms/${room.roomId}`}>
              <h6>
                {room.roomName} <span className="badge badge-info badge-pill">{room.roomUsers.length}</span>
              </h6>
            </Link>
          </li>
        ))
      )}
    </ul>
  );
};

export default RoomList;
