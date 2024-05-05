import eyes from '@/assets/images/avatarEyes.svg';
import eyesOver from '@/assets/images/avatarEyesOver.svg';
import styles from '@/styles/avatar/Avatar.module.css';

const AvatarEyes = ({
  size,
  location,
  isAlive,
}: {
  size: number;
  location: 'Home' | 'Ingame' | 'Custom' | 'Ranking' | 'Room';
  isAlive: boolean;
}) => {
  return (
    <>
      <div className={styles.AvatarEyes} style={{ width: `${size}px` }}>
        <img
          className={styles.AvatarEyesImage}
          src={isAlive ? eyes : eyesOver}
          style={{ width: `${(82.16 * size) / 300}px` }}
          alt=""
        />
      </div>
    </>
  );
};

export default AvatarEyes;
