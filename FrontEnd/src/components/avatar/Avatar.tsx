import AvatarBody from './AvatarBody';
import AvatarEyes from './AvatarEyes';
import nest from '@/assets/images/nest.svg';
import styles from '@/styles/avatar/Avatar.module.css';

const Avatar = ({ move, size, isNest }: { move: boolean; size: number; isNest: boolean }) => {
  // const outfit = {
  //   eyes: Number,
  //   body: Number
  // }
  return (
    <>
      {/* outfit props로 보내주기 */}
      {/* <div className={`${move ? styles.Animation : ''}`}> */}
      <div className={styles.Avatar} style={{ width: `${size}px`, height: `${size}px` }}>
        <div>
          <AvatarBody {...{ move, size }} />
          <AvatarEyes {...{ move, size }} />
        </div>
        {isNest ? (
          <img className={styles.Nest} style={{ width: `${size}px`, height: `auto` }} src={nest} alt="" />
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Avatar;
