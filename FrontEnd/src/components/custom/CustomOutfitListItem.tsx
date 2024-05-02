import styles from '@/styles/custom/Custom.module.css';
import { Outfit } from '@/types/custom';

const CustomOutfitListItem = ({ outfit }: { outfit: Outfit }) => {
  return (
    <div className={styles.ItemContainer}>
      <img src={outfit.image} alt="" />
      <div>{outfit.name}</div>
    </div>
  );
};

export default CustomOutfitListItem;
