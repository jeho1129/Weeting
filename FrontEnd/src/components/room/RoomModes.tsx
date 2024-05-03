import { useEffect, useState } from 'react';
import RoomWaitRadioBtn from './RoomWaitRadioBtn';

const RoomModes = () => {
  const [roomSelectedMode, setRoomSelectedMode] = useState<number>(0);

  const onChangeRoomMode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomSelectedMode(Number(e.target.value));
  };

  useEffect(() => {
    console.log('roomSelectedMode :', roomSelectedMode);
  }, [roomSelectedMode]);

  return (
    <div>
      <RoomWaitRadioBtn roomSelectedMode={roomSelectedMode} onChangeRoomMode={onChangeRoomMode} />
    </div>
  );
};

export default RoomModes;
