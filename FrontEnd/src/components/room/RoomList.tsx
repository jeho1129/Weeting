import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { RoomListData } from './../../types/roomListData';

const ChatRoomPage = () => {
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
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <h3>채팅방 리스트</h3>
        </div>
      </div>
      
      <ul className="list-group">
        {RoomListData.map((room, index) => (
          <li key={index} className="list-group-item list-group-item-action">
            <Link to={`/rooms/${room.roomid}`}>
              <h6>{room.roomname} <span className="badge badge-info badge-pill">{room.roommembers.length}</span></h6>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatRoomPage;
