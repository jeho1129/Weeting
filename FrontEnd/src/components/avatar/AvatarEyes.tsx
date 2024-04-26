import AvatarEyesOutfit from './AvatarEyesOutfit';
import eyes from '@/assets/images/avatarEyes.svg';
import styles from '@/styles/avatar/Avatar.module.css';

const AvatarEyes = ({ move, size }: { move: boolean; size: number }) => {
  return (
    <>
      <div className={styles.AvatarEyes} style={{ width: `${size}px` }}>
        <AvatarEyesOutfit {...{ size: size }} />
        <img className={styles.AvatarEyesImage} src={eyes} style={{ width: `${(81.99 * size) / 300}px` }} alt="" />
      </div>
    </>
  );
};

export default AvatarEyes;
