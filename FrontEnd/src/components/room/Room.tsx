import styles from '@/styles/room/Room.module.css';
import { useState } from 'react';
import RoomEnterBtn from './RoomEnterBtn';
import RoomList from './RoomList';
import RoomModalCreateBtn from './RoomModalCreateBtn';
import RoomModes from './RoomModes';
import RoomSearch from './RoomSearch';

const Room = () => {
  const [roomSelectedMode, setRoomSelectedMode] = useState<number>(0);
  const [searchValue, setSearchValue] = useState<string>('');

  // 검색어 변경 핸들러
  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

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
              <RoomSearch searchValue={searchValue} onSearchChange={onSearchChange} />
            </div>
          </div>
          <div>
            <RoomList roomSelectedMode={roomSelectedMode} searchValue={searchValue} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Room;
