import styles from '@/styles/room/RoomModes.module.css'
import RoomWaitRadioBtn from './RoomWaitRadioBtn';
import { useState } from 'react';

const RoomModes = () => {
  const [roomSelectedMode, setRoomSelectedMode] = useState<number>(0);
  
  const onChangeRoomMode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomSelectedMode(Number(e.target.value));
  };

  return (
    <>
      <RoomWaitRadioBtn roomSelectedMode={roomSelectedMode} onChangeRoomMode={onChangeRoomMode} />
    </>
  )
}

export default RoomModes