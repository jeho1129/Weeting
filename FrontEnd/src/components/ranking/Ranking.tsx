import styles from '@/styles/ranking/RankingPage.module.css';
import Avatar from '@/components/avatar/Avatar';
import HomeButton from '@/components/home/HomeButton';
import RankingList from './RankingList';
import { useEffect, useState } from 'react';
import { User } from '@/types/user';
import { rankingListApi } from '@/services/rankApi';
const Ranking = () => {
  const dummy: User[] = [
    {
      memberId: 1,
      nickname: '나나나',
      score: 1000,
      ranking: null,
    },
    {
      memberId: 2,
      nickname: '가가가가',
      score: 10000,
      ranking: 10,
    },
    {
      memberId: 3,
      nickname: '다나나',
      score: 1500,
      ranking: 100,
    },
  ];

  const [rankingList, setRankingList] = useState<User[]>(dummy);

  useEffect(() => {
    rankingListApi()
      .then((data: User[]) => {
        setRankingList(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className={styles.ButtonContainer}>
        <HomeButton {...{ message: '홈', direction: 'up', location: 'home' }} />
      </div>
      <div className={styles.RankingContainer}>
        <div className={styles.AvatarContainer}>
          <Avatar {...{ move: true, size: 400, isNest: true }} />
        </div>
        <div className={styles.ListContainer}>
          <RankingList rankingList={rankingList!} />
        </div>
        <div></div>
      </div>
    </>
  );
};

export default Ranking;
