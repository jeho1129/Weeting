import body from '@/assets/images/avatarBody.svg';
import leg from '@/assets/images/avatarLeg.svg';
import bodyOver from '@/assets/images/avatarBodyOver.svg';
import styles from '@/styles/avatar/Avatar.module.css';

const AvatarBody = ({
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
      <div className={styles.AvatarBody} style={{ width: `${size}px` }}>
        {isAlive ? (
          <>
            <img src={body} style={{ width: `${(190 * size) / 300}px` }} alt="" />
            <img src={leg} style={{ width: `${(60 * size) / 300}px` }} alt="" />
          </>
        ) : (
          <>
            <img src={bodyOver} style={{ width: `${(190 * size) / 300}px` }} alt="" />
          </>
        )}
      </div>
    </>
  );
};

export default AvatarBody;
