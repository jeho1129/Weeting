import { useLocation } from 'react-router-dom';
import framehome from '@/assets/images/framehome.png';
import framehomesky from '@/assets/images/framehomesky.png';
import framemain from '@/assets/images/framemain.png';
import styles from '@/styles/Frame.module.css';

const HomeFrame = () => {
  const location = useLocation();
  console.log('이동한곳:', location);

  return (
    <div className={styles.FrameContainer}>
      <div className={styles.FrameRelative}>
        {location.pathname === '/' || location.pathname === '/login' || location.pathname === '/signup' ? (
          <img className={`${styles.MainGuestFrame}`} src={framemain} alt="" />
        ) : (
          <>
            <img className={styles.FrameHomeSky} src={framehomesky} alt="" />
            <img
              className={`FrameHomeWH ${location.pathname === '/custom' ? styles.FrameCustom : location.pathname === '/ranking' ? styles.FrameRanking : location.pathname === '/room' ? styles.FrameRoom : styles.FrameHome}`}
              src={framehome}
              alt=""
            />
          </>
        )}
      </div>
    </div>
  );
};

export default HomeFrame;
