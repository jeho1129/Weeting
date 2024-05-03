import body from '@/assets/images/avatarBody.svg';
import leg from '@/assets/images/avatarLeg.svg';
import styles from '@/styles/avatar/Avatar.module.css';

const AvatarBody = ({ move, size }: { move: boolean; size: number }) => {
  return (
    <>
      <div className={styles.AvatarBody} style={{ width: `${size}px` }}>
        <img src={body} style={{ width: `${(190 * size) / 300}px` }} alt="" />
        <img src={leg} style={{ width: `${(60 * size) / 300}px` }} alt="" />
      </div>
    </>
  );
};

export default AvatarBody;
