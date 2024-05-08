import styles from '@/styles/room/Room.module.css';
import { useState } from 'react';
import RoomEnterBtn from './RoomEnterBtn';
import RoomList from './RoomList';
import RoomModalCreateBtn from './RoomModalCreateBtn';
import RoomModes from './RoomModes';
import RoomSearch from './RoomSearch';

const Room = () => {
  const [roomSelectedMode, setRoomSelectedMode] = useState<number>(0);

  const onChangeRoomMode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomSelectedMode((prevMode) => Number(e.target.value));
  };

  return (
    <>
      <div className={styles.Container}>
        <div className={styles.ButtonContainer}>
          <div className={styles.OneButton}>
            <RoomModalCreateBtn />
          </div>
          <div>
            <RoomEnterBtn />
          </div>
        </div>
        <div className={styles.Background}></div>
        <div className={styles.BackContainer}>
          <div className={styles.FirstRow}>
            <div className={styles.RightSpace}>
              <RoomModes roomSelectedMode={roomSelectedMode} onChangeRoomMode={onChangeRoomMode} />
            </div>
            <div>
              <RoomSearch />
            </div>
          </div>
          <div>
            <RoomList roomSelectedMode={roomSelectedMode} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Room;
