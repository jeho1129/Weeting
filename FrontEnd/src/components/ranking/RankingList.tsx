import styles from '@/styles/ranking/RankingPage.module.css';
import { RankingUser } from '@/types/user';
const RankingList = ({ rankingList }: { rankingList: RankingUser[] }) => {
  return (
    <>
      <div className={styles.RankingItems}>
        {rankingList.map((user) => {
          if (user.ranking !== null) {
            return (
              <>
                <div
                  className={`${user.ranking === 1 ? `FontM60` : user.ranking < 4 ? 'FontM40' : 'FontM32'} ${styles.RankingItem}`}
                  key={user.nickname}
                >
                  <div className={`${styles.First}`}>{user.ranking}위</div>
                  <div>{user.nickname}</div>
                  <div>{user.score}점</div>
                </div>
              </>
            );
          } else {
            return <></>;
          }
        })}
      </div>
    </>
  );
};

export default RankingList;
