import framehome from '@/assets/images/framehome.png';
import framehomesky from '@/assets/images/framehomesky.png';
import styles from '@/styles/home/HomePage.module.css';

const HomeFrame = () => {
  return (
    <div className={styles.Container}>
      <img className={styles.FrameHomeSky} src={framehomesky} alt="" />
      <img className={styles.FrameHome} src={framehome} alt="" />
    </div>
  );
};

export default HomeFrame;
