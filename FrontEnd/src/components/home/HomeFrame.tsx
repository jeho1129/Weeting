import { useLocation } from 'react-router-dom';
import framehome from '@/assets/images/framehome.png';
import framehomesky from '@/assets/images/framehomesky.png';
import framemain from '@/assets/images/framemain.png';
import building1 from '@/assets/images/building1.png';
import building2 from '@/assets/images/building2.png';
import styles from '@/styles/Frame.module.css';

const HomeFrame = () => {
  const location = useLocation();
  console.log('이동한곳:', location);
  console.log('indexOF', location.pathname.indexOf('/room/') !== -1);

  return (
    <div className={styles.FrameContainer}>
      <div className={styles.FrameRelative}>
        {location.pathname === '/' || location.pathname === '/login' || location.pathname === '/signup' ? (
          <img className={`${styles.MainGuestFrame}`} src={framemain} alt="" />
        ) : location.pathname.indexOf('/room/') === -1 ? (
          <>
            <img className={styles.FrameHomeSky} src={framehomesky} alt="" />
            <img
              className={`FrameHomeWH ${location.pathname === '/custom' ? styles.FrameCustom : location.pathname === '/ranking' ? styles.FrameRanking : location.pathname === '/room' ? styles.FrameRoom : styles.FrameHome}`}
              src={framehome}
              alt=""
            />
          </>
        ) : (
          <>
            <img className={styles.FrameHomeSky} src={framehomesky} alt="" />
            <img className={`${styles.Building} ${styles.Building1}`} src={building1} alt="building1" />
            <img className={`${styles.Building} ${styles.Building2}`} src={building2} alt="building2" />
          </>
        )}
      </div>
    </div>
  );
};

export default HomeFrame;
