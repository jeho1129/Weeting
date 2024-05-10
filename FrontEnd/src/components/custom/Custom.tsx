import styles from '@/styles/custom/Custom.module.css';
import AvatarFirst from '@/components/avatar/AvatarFirst';
import HomeButton from '@/components/home/HomeButton';
import CustomOutfitList from './CustomOutfitList';
import { useEffect, useState } from 'react';
import { Outfit, OutfitItem, dummyOutfit } from '@/types/custom';
import { outfitAllApi, outfitChangeApi, outfitNowApi } from '@/services/customApi';
import { useRecoilValue } from 'recoil';
import { userState } from '@/recoil/atom';

const Custom = () => {
  const userInfo = useRecoilValue(userState);
  const [outfitList, setOutfitList] = useState<Outfit[]>(dummyOutfit);
  const [nowOutfit, setNowOutfit] = useState<OutfitItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isClicked, setIsClicked] = useState(false);
  const nicknameInput = document.getElementById('nicknameInput');

  useEffect(() => {
    outfitNowApi(userInfo.userId)
      .then((data: OutfitItem[]) => {
        setNowOutfit(data);
      })
      .then(() => {
        setIsLoading(false);
      });
    outfitAllApi(userInfo.userId).then((data) => {
      setOutfitList(data);
    });
  }, []);

  return (
    <>
      <div className={styles.CustomContainer}>
        <div className={styles.AvatarContainer}>
          {!isLoading ? (
            <AvatarFirst
              {...{
                size: 350,
                outfit: nowOutfit,
                location: 'Custom',
                options: { nickname: userInfo.nickname, isNest: true },
              }}
            />
          ) : (
            <div style={{ width: '350px', height: '350px', backgroundColor: 'transparent' }}></div>
          )}

          <div className={`FontM20 ${styles.CustomButtonContainer}`}>
            <div
              className={`${styles.CustomButton}`}
              onClick={() => {
                if (isClicked) {
                  setIsClicked(false);
                } else {
                  nicknameInput?.focus();
                  setIsClicked(true);
                  setTimeout(() => {
                    setIsClicked(false);
                  }, 4000);
                }
              }}
            >
              닉네임 수정
            </div>
            <div
              className={`${styles.CustomButton}`}
              onClick={() => {
                outfitChangeApi(
                  userInfo.userId,
                  nowOutfit.map((it) => it.outfitId),
                );
              }}
            >
              커스텀 확정
            </div>
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
