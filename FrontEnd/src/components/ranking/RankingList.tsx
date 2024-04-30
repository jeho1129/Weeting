import styles from '@/styles/ranking/RankingPage.module.css';
import { RankingUser } from '@/types/user';
const RankingList = ({ rankingList }: { rankingList: RankingUser[] }) => {
  return (
    <>
      <div className={styles.RankingItems}>
        {rankingList.map((user) => {
          return (
            <div
              className={`${user.ranking === 1 ? 'FontM60' : user.ranking < 4 ? 'FontM32' : 'FontM20'} ${styles.RankingItem}`}
              key={user.nickname}
            >
              {user.ranking}등 {user.nickname} {user.score}점
            </div>
          );
        })}
      </div>
    </>
  );
};

export default RankingList;
