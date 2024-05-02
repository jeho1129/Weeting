import styles from '@/styles/room/RoomCount.module.css'
import { CaretLeft, CaretRight } from '@phosphor-icons/react';

const RoomCount = () => {
  const selectedMaxCount = 4;
  return (
    <>
      <div className={styles.Dir}>
        <CaretLeft size={20} />
        <div className={styles.MaxCount}>{selectedMaxCount}</div>
        <CaretRight size={20}/>
      </div>
    </>
  );
}

export default RoomCount;