import styles from '@/styles/room/RoomPage.module.css';
import { Outlet } from 'react-router-dom';
import HomeButton from '@/components/home/HomeButton';

const RoomPage = () => {
  return (
    <>
      <div className={styles.FrameContainer}>
        <Outlet />
        <div className={styles.ButtonContainer}>
          <HomeButton {...{ message: '', direction: 'left', location: 'home' }} />
        </div>
      </div>
    </>
  );
};

export default RoomPage;
