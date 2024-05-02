import styles from '@/styles/room/RoomCount.module.css'
import { CaretLeft, CaretRight } from '@phosphor-icons/react';

const RoomCount = () => {
  const selectedMaxCount = 4;
  return (
    <>
      <CaretLeft size={20} className={styles.Dir} />
      <div className={styles.MaxCount}>{selectedMaxCount}</div>
      <CaretRight size={20} className={styles.Dir} />
    </>
  );
}

export default RoomCount;