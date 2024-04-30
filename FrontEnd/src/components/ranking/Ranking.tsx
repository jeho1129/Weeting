import styles from '@/styles/ranking/RankingPage.module.css';
import Avatar from '@/components/avatar/Avatar';
import HomeButton from '@/components/home/HomeButton';
import RankingList from './RankingList';
import { useEffect, useState } from 'react';
import { RankingUser } from '@/types/user';
import { rankingListApi } from '@/services/rankApi';
const Ranking = () => {
  const dummy: RankingUser[] = [
    {
      ranking: 1,
      nickname: '하준2',
      score: 1000,
    },
    {
      ranking: 2,
      nickname: 'asdf',
      score: 1000,
    },
    {
      ranking: 3,
      nickname: '하준22',
      score: 900,
    },
    {
      ranking: 4,
      nickname: 'dfs',
      score: 900,
    },
    {
      ranking: 5,
      nickname: 'asd',
      score: 900,
    },
    {
      ranking: 6,
      nickname: 'ffs',
      score: 900,
    },
    {
      ranking: 6,
      nickname: 'ffs',
      score: 900,
    },
    {
      ranking: 8,
      nickname: 'ffs',
      score: 900,
    },
    {
      ranking: 9,
      nickname: 'ffs',
      score: 900,
    },
    {
      ranking: 10,
      nickname: 'ffs',
      score: 900,
    },
    {
      ranking: 11,
      nickname: 'ffs',
      score: 900,
    },
  ];

  const [rankingList, setRankingList] = useState<RankingUser[]>(dummy);

  useEffect(() => {
    rankingListApi()
      .then((data: RankingUser[]) => {
        setRankingList(data);
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
          <Avatar {...{ move: true, size: 400, isNest: true }} />
          <div>내 순위는 {}</div>
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
