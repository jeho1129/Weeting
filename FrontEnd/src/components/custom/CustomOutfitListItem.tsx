import styles from '@/styles/custom/Custom.module.css';
import { Outfit } from '@/types/custom';

const CustomOutfitListItem = ({ outfit }: { outfit: Outfit }) => {
  return (
    <div className={styles.ItemContainer}>
      <div className={`FontM32 ${outfit.owned ? styles.ItemUnLock : styles.ItemLock}`}>
        <div className="FontM20">개방조건</div>
        <div>랭킹 {outfit.getCondition}위</div>
      </div>
      <img src={outfit.image} alt="" />
      <div>{outfit.name}</div>
    </div>
  );
};

export default CustomOutfitListItem;
