import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { RoomWaitData } from '@/types/roomWaitData';
import styles from '@/styles/room/RoomList.module.css'
import watingAvatar from '@/assets/images/inGameAvatar.png'
import { Lock } from '@phosphor-icons/react';

const RoomList = () => {
  const [roomName, setRoomName] = useState('');
  const [chatRooms, setChatRooms] = useState([]);

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

  
  return (
    // <div className="container">
      
      <ul className={styles.ListGroup}>
        {RoomWaitData.map((room, index) => (
          <li key={index} className={styles.OneRoom}>
            <div className={`${styles.FirstRow}`}>
              <div className={`${styles.RoomName} FontM32`}>{room.roomName}</div>
              <div className={`${styles.RoomUsers} FontM20`}>{room.roomUsers.length}/{room.roomMaxCnt}</div>
              {room.roomPassword !== null ? <Lock className={styles.Lock} size={25} /> : <></>}
              
            </div>
            <div className={styles.SecondRow}>
              <div>RoomMode</div>
            </div>
            <div className={styles.Avatar}>
              <img src={watingAvatar} alt="waitingAvatar" />
            </div>
            <div>Dummy Image Position Absolute</div>
            <Link to={`/rooms/${room.roomId}`}>
              <h6>{room.roomName} <span className="badge badge-info badge-pill">{room.roomUsers.length}</span></h6>
            </Link>
          </li>
        ))}
      </ul>
    // </div>
  );
};

export default RoomList;
