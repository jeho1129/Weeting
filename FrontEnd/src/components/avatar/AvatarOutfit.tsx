import { OutfitSet } from '@/types/custom';
import styles from '@/styles/avatar/Avatar.module.css';
const AvatarOutfit = ({
  size,
  outfit,
  ingame,
  nickname,
}: {
  size: number;
  outfit: OutfitSet;
  ingame: boolean;
  nickname: string;
}) => {
  return (
    <>
      <div className={styles.OutfitContainer} style={{ width: `${size}px`, height: `${size}px` }}>
        {outfit.head !== null ? (
          <img src={outfit.head.image} className={styles.AvatarOutfit} style={{ width: `${size}px` }} alt="" />
        ) : (
          <></>
        )}
        {outfit.eyes !== null ? (
          <img src={outfit.eyes.image} className={styles.AvatarOutfit} style={{ width: `${size}px` }} alt="" />
        ) : (
          <></>
        )}
        {outfit.nametag !== null && ingame ? (
          <>
            <div
              className={styles.NameTag}
              style={{
                width: `${(125.85 * size) / 300}px`,
                height: `${(size * 50) / 300}px`,
                fontSize: `${(size * 32) / 300}px`,
                left: `calc(50% - ${(125.85 * size) / 600}px)`,
              }}
            >
              {nickname}
            </div>
            <img src={outfit.nametag.image} className={styles.AvatarOutfit} style={{ width: `${size}px` }} alt="" />
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default AvatarOutfit;
