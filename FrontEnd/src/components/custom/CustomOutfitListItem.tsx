import styles from '@/styles/custom/Custom.module.css';
import { Outfit } from '@/types/custom';
import { useState } from 'react';
const ItemToolTip = (outfit: Outfit) => {
  const { name, part, image, getCondition, description, owned } = outfit;
  return (
    <div className={`FontM16 ${styles.ToolTipContainer}`}>
      <div className={`${styles.ToolTipFlex}`}>
        <div style={{ fontFamily: 'MapleStoryBold', fontSize: '20px' }}>{name}</div>
        <div>{part === 'eyes' ? '눈장식' : part === 'head' ? '머리장식' : '이름표'}</div>
        <div style={{ fontStyle: 'italic' }}>{getCondition ? `${getCondition}등 이상 소유 가능` : ''}</div>
        <div>{description}</div>
        <div>{owned}</div>
      </div>
    </div>
  );
};
const CustomOutfitListItem = ({ outfit }: { outfit: Outfit }) => {
  const [isHover, setIsHover] = useState(false);
  return (
    <div
      className={styles.ItemContainer}
      onMouseEnter={() => {
        setIsHover(true);
      }}
      onMouseMove={() => {
        setIsHover(true);
      }}
      onMouseOut={() => {
        setIsHover(false);
      }}
    >
      <div className={`FontM32 ${outfit.owned ? styles.ItemUnLock : styles.ItemLock}`}>
        <div className="FontM20">개방조건 {outfit.getCondition}</div>
        <div>랭킹 {outfit.getCondition}위</div>
      </div>
      <img src={outfit.image} alt="" />
      {isHover ? <ItemToolTip {...outfit} /> : <></>}
    </div>
  );
};

export default CustomOutfitListItem;
