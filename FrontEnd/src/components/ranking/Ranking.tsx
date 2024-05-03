import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styles from '@/styles/ranking/RankingPage.module.css';

import Avatar from '@/components/avatar/Avatar';
import HomeButton from '@/components/home/HomeButton';
import RankingList from './RankingList';

import { outfitState, userState } from '@/recoil/atom';
import { RankingUser } from '@/types/user';
import { rankingListApi } from '@/services/rankApi';

const Ranking = () => {
  const [rankingList, setRankingList] = useState<RankingUser[]>([]);
  const userInfo = useRecoilValue(userState);
  const outfitInfo = useRecoilValue(outfitState);

  useEffect(() => {
    rankingListApi()
      .then((data: RankingUser[]) => {
        setRankingList(data);
        console.log(userInfo);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className={styles.ButtonContainer}>
        <HomeButton {...{ message: '', direction: 'up', location: 'home' }} />
      </div>
      <div className={styles.RankingContainer}>
        <div className={styles.AvatarContainer}>
          <div>
            <Avatar {...{ move: true, size: 400, isNest: true, outfit: outfitInfo }} />
          </div>
          <div>
            <div className={`FontM32`}>내 순위는 {userInfo.ranking}</div>
          </div>
        </div>
        <div className={styles.ListContainer}>
          <div className="FontM60">✨🎈랭킹🎉✨</div>
          <div className={styles.ListWH}>
            <RankingList rankingList={rankingList!} />
          </div>
        </div>
      </div>
    </>
  );
};
export default Ranking;
