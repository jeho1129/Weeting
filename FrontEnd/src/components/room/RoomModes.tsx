import { useEffect } from 'react';
import RoomWaitRadioBtn from './RoomWaitRadioBtn';

const RoomModes = ({ roomSelectedMode, onChangeRoomMode }) => {
  // useEffect(() => {
  //   console.log('roomSelectedMode :', roomSelectedMode);
  // }, [roomSelectedMode]);

  return (
    <div>
      <RoomWaitRadioBtn roomSelectedMode={roomSelectedMode} onChangeRoomMode={onChangeRoomMode} />
    </div>
  );
};

export default RoomModes;
