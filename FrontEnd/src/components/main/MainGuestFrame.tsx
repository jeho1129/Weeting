import styles from '@/styles/main/MainGuestFrame.module.css';
import frametest from '@/assets/images/frametest.png';
const MainGuestFrame = () => {
  return (
    <div className={styles.FrameContainer}>
      <img className={styles.MainGuestFrame} src={frametest} alt="" />
    </div>
  );
};

export default MainGuestFrame;
