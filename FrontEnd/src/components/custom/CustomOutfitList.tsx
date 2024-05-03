import { Outfit, OutfitItem } from '@/types/custom';
import CustomOutfitListItem from './CustomOutfitListItem';
import { useState } from 'react';
import CustomOutfitListPartButton from './CustomOutfitListTypeButton';
import styles from '@/styles/custom/Custom.module.css';
import { useRecoilValue } from 'recoil';
import { userState } from '@/recoil/atom';

const CustomOutfitList = ({
  outfitList,
  nowOutfit,
  setNowOutfit,
}: {
  outfitList: Outfit[];
  nowOutfit: OutfitItem[];
  setNowOutfit: React.Dispatch<React.SetStateAction<OutfitItem[]>>;
}) => {
  const userInfo = useRecoilValue(userState);
  const [outfitPart, setOutfitPart] = useState<'all' | 'eyes' | 'head' | 'nametag'>('all');
  return (
    <div>
      <CustomOutfitListPartButton {...{ outfitPart, setOutfitPart }} />
      <div className={styles.OutfitContainer}>
        <div className={styles.OutfitListContainer}>
          {outfitList
            .filter((items) => outfitPart === 'all' || items.part === outfitPart)
            .map((item) => (
              <div key={item.outfitId}>
                <div>{item.description}</div>
                <div
                  onClick={() => {
                    const CheckList: OutfitItem[] = nowOutfit.filter((it) => it.part !== item.part);
                    if (nowOutfit.every((it) => it.outfitId !== item.outfitId)) {
                      CheckList.push({
                        userId: userInfo.userId,
                        outfitId: item.outfitId,
                        part: item.part,
                        image: item.image,
                      });
                    }
                    setNowOutfit(CheckList);
                    console.log(CheckList);
                  }}
                >
                  <CustomOutfitListItem {...{ outfit: item }} />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CustomOutfitList;
