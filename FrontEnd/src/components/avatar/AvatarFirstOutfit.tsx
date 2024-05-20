import { OutfitSet } from '@/types/custom';
import { userState } from '@/recoil/atom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userUpdateApi, nicknameCheckApi } from '@/services/userApi';
import { useState, useRef } from 'react';
import styles from '@/styles/avatar/Avatar.module.css';
const AvatarOutfit = ({
  size,
  location,
  outfitSet,
  nickname,
  isAlive,
}: {
  size: number;
  location: 'Home' | 'Ingame' | 'Custom' | 'Ranking' | 'Room';
  outfitSet: OutfitSet;
  nickname: string;
  isAlive: boolean;
}) => {
  const userInfo = useRecoilValue(userState);
  const setUserInfo = useSetRecoilState(userState);
  const [newNickname, setNewNickname] = useState(nickname);
  const [isClick, setIsClick] = useState(false);
  const inputEl = useRef<HTMLInputElement>(null);

  const updateNickname = () => {
    if (newNickname.length > 0) {
      nicknameCheckApi({ nickname: newNickname })
        .then(() => {
          userUpdateApi(newNickname)
            .then(() => {
              setUserInfo({
                userId: userInfo.userId,
                nickname: newNickname,
                score: userInfo.userId,
                ranking: userInfo.ranking,
              });
            })
            .then(() => {
              setIsClick(false);
            });
        })
        .catch(() => {
          if (document.activeElement?.tagName !== 'INPUT') {
            alert('이미 사용하는 닉네임입니다.');
          }
          inputEl.current?.focus();
        });
    } else {
      if (document.activeElement?.tagName !== 'INPUT') {
        alert('닉네임은 한글자 이상이어야합니다.');
      }
      inputEl.current?.focus();
    }
  };

  return (
    <>
      <div className={styles.OutfitContainer} style={{ width: `${size}px`, height: `${size}px` }}>
        {
          // 머리 아이템
          outfitSet.head !== null ? (
            <img
              src={outfitSet.head.image}
              className={`${isAlive && location !== 'Custom' && location !== 'Room' ? styles.AvatarOutfitBodyMove : ''} ${styles.AvatarOutfit}`}
              style={{ width: `${size}px` }}
              alt=""
            />
          ) : (
            <></>
          )
        }

        {
          // 눈 아이템
          outfitSet.eyes !== null ? (
            outfitSet.eyes.image.indexOf('GOONGYAE_EYEPATCH') !== -1 ? (
              <img
                src={outfitSet.eyes.image}
                className={`${isAlive && location !== 'Custom' && location !== 'Room' ? styles.AvatarOutfitBodyMove : ''} ${styles.AvatarOutfit}`}
                style={{ width: `${size}px` }}
                alt=""
              />
            ) : outfitSet.eyes.image.indexOf('ONION_KOONGYA_EYES') !== -1 ? (
              <img
                src={outfitSet.eyes.image}
                className={`${styles.AvatarOutfit}`}
                style={{ width: `${size}px` }}
                alt=""
              />
            ) : (
              <img
                src={outfitSet.eyes.image}
                className={`${isAlive && location !== 'Custom' && location !== 'Room' ? styles.AvatarOutfitEyesMove : ''} ${styles.AvatarOutfit}`}
                style={{ width: `${size}px` }}
                alt=""
              />
            )
          ) : (
            <></>
          )
        }

        {
          // 이름표
          outfitSet.nametag !== null ? (
            // 커스텀 닉네임 수정 부분
            location === 'Custom' ? (
              <div>
                <input
                  className={`${styles.NameTagEdit} ${isClick ? styles.NameTagEditStart : ''}`}
                  style={{
                    width: `${(125.85 * size) / 300 - 10}px`,
                    height: `${(size * 50) / 300}px`,
                    fontSize: `${(size * 28) / 300}px`,
                    left: `calc(50% - ${(125.85 * size) / 600 - 5}px)`,
                  }}
                  type="text"
                  value={newNickname}
                  minLength={1}
                  maxLength={4}
                  size={4}
                  spellCheck={false}
                  id="nicknameInput"
                  ref={inputEl}
                  onFocus={() => {
                    setIsClick(true);
                  }}
                  onChange={(e) => {
                    setNewNickname(e.target.value);
                  }}
                  onBlur={updateNickname}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      updateNickname;
                      (document.activeElement as HTMLElement).blur();
                    }
                  }}
                />
                <img
                  src={outfitSet.nametag!.image}
                  className={styles.AvatarOutfit}
                  style={{ width: `${size}px` }}
                  alt=""
                />
              </div>
            ) : // 게임 방에서
            location === 'Ingame' ? (
              <>
                <div
                  className={`${isAlive ? styles.AvatarOutfitBodyMove : ''} ${styles.NameTag}`}
                  style={{
                    width: `${(125.85 * size) / 300}px`,
                    height: `${(size * 50) / 300}px`,
                    fontSize: `${(size * 28) / 300}px`,
                    left: `calc(50% - ${(125.85 * size) / 600}px)`,
                  }}
                >
                  {nickname}
                </div>
                <img
                  src={outfitSet.nametag!.image}
                  className={`${isAlive ? styles.AvatarOutfitBodyMove : ''} ${styles.AvatarOutfit}`}
                  style={{ width: `${size}px` }}
                  alt=""
                />
              </>
            ) : (
              // 그외
              <></>
            )
          ) : (
            // 그외
            <></>
          )
        }
      </div>
    </>
  );
};

export default AvatarOutfit;
