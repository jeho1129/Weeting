import styles from '@/styles/room/Room.module.css';
import RoomEnterBtn from './RoomEnterBtn';
import ChatRoomPage from './RoomList';
import RoomModalCreateBtn from './RoomModalCreateBtn';

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

        <div>
          <ChatRoomPage />
        </div>
      </div>
    </>
  );
};

export default Room;
