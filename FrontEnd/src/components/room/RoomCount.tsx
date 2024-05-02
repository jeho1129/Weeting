import styles from '@/styles/room/RoomCount.module.css';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';

const RoomCount = ({ selectedMaxCount, setSelectedMaxCount }) => {
  const leftHandler = () => {
    setSelectedMaxCount((prev: number) => {
      if (prev === 4) {
        return 8;
      }
      return prev - 2;
    });
  };

  const rightHandler = () => {
    setSelectedMaxCount((prev: number) => {
      if (prev === 8) {
        return 4;
      }
      return prev + 2;
    });
  };

  return (
    <div className={styles.RoomCountContainer}>
      <span className={`${styles.RoomCountLabel} FontM20`}>&#9679; 방 인원</span>
      <div className={styles.DirContainer}>
        <CaretLeft size={20} className={styles.Dir} onClick={leftHandler} />
        <div className={styles.MaxCount}>{selectedMaxCount}</div>
        <CaretRight size={20} className={styles.Dir} onClick={rightHandler} />
      </div>
    </div>
  );
};

export default RoomCount;
