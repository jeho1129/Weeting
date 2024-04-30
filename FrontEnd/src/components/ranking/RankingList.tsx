import styles from '@/styles/ranking/RankingPage.module.css';
import { User } from '@/types/user';
const RankingList = ({ rankingList }: { rankingList: User[] }) => {
  return (
    <>
      <div>
        {rankingList.map((member, i) => {
          return (
            <div key={member.memberId}>
              {i + 1}등 {member.nickname}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default RankingList;
