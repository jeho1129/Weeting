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
          <div className={styles.AvatarRankingMessage}>
            <div className={styles.AvatarRankingMessageContainer}>
              <div className={`FontM32 ${styles.AvatarRankingMessage1}`}>내 순위는</div>
              <div className={`${styles.AvatarRankingMessage2} ${userInfo.ranking ? 'FontM60' : `FontM32`}`}>
                {userInfo.ranking
                  ? userInfo.ranking <= 50
                    ? `${userInfo.ranking}위`
                    : '순위권 밖'
                  : '정각에 공개됩니다!'}
              </div>
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
