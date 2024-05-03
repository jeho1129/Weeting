import { OutfitItem, OutfitSet } from '@/types/custom';
import AvatarBody from './AvatarBody';
import AvatarEyes from './AvatarEyes';
import nest from '@/assets/images/nest.svg';
import styles from '@/styles/avatar/Avatar.module.css';
import AvatarOutfit from './AvatarOutfit';

const Avatar = ({
  move,
  size,
  isNest,
  outfit,
  ingame,
  nickname,
}: {
  move: boolean;
  size: number;
  isNest: boolean;
  outfit: OutfitItem[];
  ingame: boolean;
  nickname?: string;
}) => {
  const eyeOutfit =
    outfit.filter((it) => {
      return it.part === 'eyes';
    }).length > 0
      ? outfit.filter((it) => {
          return it.part === 'eyes';
        })[0]
      : null;
  const headOutfit =
    outfit.filter((it) => {
      return it.part === 'head';
    }).length > 0
      ? outfit.filter((it) => {
          return it.part === 'head';
        })[0]
      : null;
  const nameTagOutfit =
    outfit.filter((it) => {
      return it.part === 'nametag';
    }).length > 0
      ? outfit.filter((it) => {
          return it.part === 'nametag';
        })[0]
      : null;

  const outfitSet: OutfitSet = {
    eyes: eyeOutfit,
    head: headOutfit,
    nametag: nameTagOutfit,
  };
  console.log('outfit: ', outfit);
  console.log(outfitSet);
  console.log(
    outfit.filter((it) => {
      console.log(it);
      it.part === 'eyes';
    }).length,
  );
  return (
    <>
      {/* outfit props로 보내주기 */}
      {/* <div className={`${move ? styles.Animation : ''}`}> */}
      <div className={styles.Avatar} style={{ width: `${size}px`, height: `${size}px` }}>
        <div>
          <AvatarBody {...{ move, size }} />
          <AvatarEyes {...{ move, size }} />
          <AvatarOutfit {...{ size, outfit: outfitSet, ingame, nickname }} />
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
