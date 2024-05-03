import styles from '@/styles/room/Room.module.css';
import RoomEnterBtn from './RoomEnterBtn';
import ChatRoomPage from './RoomList';
import RoomModalCreateBtn from './RoomModalCreateBtn';
import RoomModes from './RoomModes';
import RoomSearch from './RoomSearch';

const Room = () => {
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
            <div>
              <RoomModes />
            </div>
            <div>
              <RoomSearch />
            </div>
          </div>
          <div>RoomPages</div>
          <ChatRoomPage />
        </div>
      </div>
    </>
  );
};

export default Room;
