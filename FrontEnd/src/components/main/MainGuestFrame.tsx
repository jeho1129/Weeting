import styles from '@/styles/main/MainGuestFrame.module.css';
import framemain from '@/assets/images/framemain.png';
const MainGuestFrame = () => {
  return (
    <div className={styles.FrameContainer}>
      <img className={styles.MainGuestFrame} src={framemain} alt="" />
    </div>
  );
};

export default MainGuestFrame;
