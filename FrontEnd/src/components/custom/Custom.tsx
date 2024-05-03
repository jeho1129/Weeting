import styles from '@/styles/custom/Custom.module.css';
import Avatar from '@/components/avatar/Avatar';
import HomeButton from '@/components/home/HomeButton';
import CustomOutfitList from './CustomOutfitList';
import { useEffect, useState } from 'react';
import { Outfit, OutfitItem } from '@/types/custom';
import { outfitAllApi, outfitChangeApi, outfitNowApi } from '@/services/customApi';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userState } from '@/recoil/atom';
import { userUpdateApi } from '@/services/userApi';
const Custom = () => {
  const userInfo = useRecoilValue(userState);
  const setUserInfo = useSetRecoilState(userState);
  const [nickname, setNickname] = useState(userInfo.nickname);
  const [outfitList, setOutfitList] = useState<Outfit[]>([]);
  const [nowOutfit, setNowOutfit] = useState<OutfitItem[]>([]);
  useEffect(() => {
    outfitNowApi(userInfo.userId).then((data: OutfitItem[]) => {
      setNowOutfit(data);
      console.log(data);
    });
    outfitAllApi(userInfo.userId).then((data) => {
      console.log(data);
      setOutfitList(data);
    });
  }, []);
  return (
    <>
      <div className={styles.CustomContainer}>
        <div>
          <Avatar {...{ move: true, size: 350, isNest: true, outfit: nowOutfit, ingame: true, nickname: nickname }} />
          <div>
            <input
              type="text"
              value={nickname}
              maxLength={4}
              onChange={(e) => {
                setNickname(e.target.value);
              }}
            />
            <button
              onClick={() => {
                userUpdateApi(nickname).then(() => {
                  setUserInfo({
                    userId: userInfo.userId,
                    nickname: nickname,
                    score: userInfo.userId,
                    ranking: userInfo.userId,
                  });
                });
              }}
            >
              수정
            </button>
          </div>
          <div>
            <button
              onClick={() => {
                outfitChangeApi(
                  userInfo.userId,
                  nowOutfit.map((it) => it.outfitId),
                );
              }}
            >
              커스텀 확정
            </button>
          </div>
        </div>
        <CustomOutfitList {...{ outfitList: outfitList, nowOutfit: nowOutfit, setNowOutfit: setNowOutfit }} />
      </div>
      <div className={styles.ButtonContainer}>
        <HomeButton {...{ message: '', direction: 'right', location: 'home' }} />
      </div>
    </>
  );
};

export default Custom;
