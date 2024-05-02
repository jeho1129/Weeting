import styles from '@/styles/custom/Custom.module.css';
import Avatar from '@/components/avatar/Avatar';
import HomeButton from '@/components/home/HomeButton';
import CustomOutfitList from './CustomOutfitList';
import { useEffect, useState } from 'react';
import { Outfit } from '@/types/custom';
import { outfitAllApi } from '@/services/customApi';
import { useRecoilValue } from 'recoil';
import { userState } from '@/recoil/atom';
const Custom = () => {
  const userInfo = useRecoilValue(userState);
  const [outfitList, setOutfitList] = useState<Outfit[]>([]);
  useEffect(() => {
    outfitAllApi(userInfo.userId).then((data) => {
      console.log(data);
      setOutfitList(data);
    });
  }, []);

  return (
    <>
      {/* <div className={styles.AvatarContainer}>
      </div> */}
      <div className={styles.CustomContainer}>
        <Avatar {...{ move: true, size: 400, isNest: true }} />
        <CustomOutfitList {...{ outfitList: outfitList }} />
      </div>
      <div className={styles.ButtonContainer}>
        <HomeButton {...{ message: '', direction: 'right', location: 'home' }} />
      </div>
    </>
  );
};

export default Custom;
