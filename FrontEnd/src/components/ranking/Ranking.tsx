import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styles from '@/styles/ranking/RankingPage.module.css';

import Avatar from '@/components/avatar/Avatar';
import HomeButton from '@/components/home/HomeButton';
import RankingList from './RankingList';
import rankingTitle from '@/assets/images/rankingTitle.svg';

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
      <img className={styles.RankingTitle} src={rankingTitle} alt="" />
      <div className={styles.ButtonContainer}>
        <HomeButton {...{ message: '', direction: 'up', location: 'home' }} />
      </div>
      <div className={styles.RankingContainer}>
        <div className={styles.AvatarContainer}>
          <div>
            <Avatar
              {...{
                size: 350,
                outfit: outfitInfo,
                location: 'Ranking',
                options: { nickname: userInfo.nickname, isNest: true },
              }}
            />
          </div>
          <div>
            <div className={`FontM32`}>
              <div>내 순위는</div>
              <div className="FontM60">{userInfo.ranking ? `${userInfo.ranking}위 입니다!` : '정각에 공개됩니다!'}</div>
            </div>
          </div>
        </div>
        <div className={styles.ListContainer}>
          <div className={styles.ListWH}>
            <RankingList rankingList={rankingList!} />
          </div>
        </div>
      </div>
    </>
  );
};
export default Ranking;
