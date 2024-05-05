import { OutfitSet } from '@/types/custom';
import AvatarBody from './AvatarBody';
import AvatarEyes from './AvatarEyes';
import nest from '@/assets/images/avatarNest.svg';
import styles from '@/styles/avatar/Avatar.module.css';
import AvatarOutfit from './AvatarOutfit';
import { AvatarProps } from '@/types/avatar';
import { useEffect, useState } from 'react';

const Avatar = ({ size, outfit, location, options }: AvatarProps) => {
  const nickname = options?.nickname !== null && options?.nickname !== undefined ? options.nickname : '';
  const isNest = options?.isNest !== null && options?.isNest !== undefined ? options.isNest : false;
  const isAlive = options?.isAlive !== null && options?.isAlive !== undefined ? options.isAlive : true;

  const [outfitSet, setOutfitSet] = useState<OutfitSet>({ eyes: null, head: null, nametag: null });

  useEffect(() => {
    const eyeOutfit =
      outfit.filter((it) => it.part === 'eyes').length > 0 ? outfit.filter((it) => it.part === 'eyes')[0] : null;
    const headOutfit =
      outfit.filter((it) => it.part === 'head').length > 0 ? outfit.filter((it) => it.part === 'head')[0] : null;
    const nameTagOutfit =
      outfit.filter((it) => it.part === 'nametag').length > 0 ? outfit.filter((it) => it.part === 'nametag')[0] : null;

    setOutfitSet({
      eyes: eyeOutfit,
      head: headOutfit,
      nametag: nameTagOutfit,
    });

    console.log(outfitSet);
  }, [outfit]);

  return (
    <>
      <div className={styles.Avatar} style={{ width: `${size}px`, height: `${size}px` }}>
        {
          // nametag의 값이 로드 되면 무조건 null값이 아니기 때문에 nametag의 값 유무로 로딩되었는지 확인
          outfitSet.nametag !== null ? (
            <div>
              <AvatarBody {...{ size, location, isAlive }} />
              <AvatarEyes {...{ size, location, isAlive }} />
              <AvatarOutfit {...{ size, location, outfitSet, nickname }} />
            </div>
          ) : (
            <div></div>
          )
        }
        {isNest === true ? (
          <img className={styles.Nest} style={{ width: `${size}px`, height: `auto` }} src={nest} alt="" />
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Avatar;
