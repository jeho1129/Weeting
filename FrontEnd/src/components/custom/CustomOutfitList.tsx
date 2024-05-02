import { Outfit } from '@/types/custom';
import CustomOutfitListItem from './CustomOutfitListItem';
import { useState } from 'react';
import CustomOutfitListPartButton from './CustomOutfitListTypeButton';
import styles from '@/styles/custom/Custom.module.css';

const CustomOutfitList = ({ outfitList }: { outfitList: Outfit[] }) => {
  const [outfitPart, setOutfitPart] = useState<'all' | 'eyes' | 'head' | 'nametag'>('all');
  return (
    <div>
      <CustomOutfitListPartButton {...{ outfitPart, setOutfitPart }} />
      <div className={styles.OutfitContainer}>
        <div className={styles.OutfitListContainer}>
          {outfitList
            .filter((item) => outfitPart === 'all' || item.part === outfitPart)
            .map((item) => (
              <div key={item.outfitId}>
                <CustomOutfitListItem {...{ outfit: item }} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CustomOutfitList;
