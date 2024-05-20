import styles from '@/styles/custom/Custom.module.css';
const CustomOutfitListPartButton = ({
  outfitPart,
  setOutfitPart,
}: {
  outfitPart: 'all' | 'eyes' | 'head' | 'nametag';
  setOutfitPart: React.Dispatch<React.SetStateAction<'all' | 'eyes' | 'head' | 'nametag'>>;
}) => {
  const outfitPartList: { code: 'all' | 'eyes' | 'head' | 'nametag'; name: string }[] = [
    { code: 'all', name: '전체보기' },
    { code: 'eyes', name: '눈장식' },
    { code: 'head', name: '머리장식' },
    { code: 'nametag', name: '이름표' },
  ];
  return (
    <>
      <ul className={styles.OutfitFilter}>
        {outfitPartList.map((item) => {
          return (
            <li
              className={`FontM32 ${styles.FilterButton} ${item.code === outfitPart ? styles.FilterButtonAcitve : ''}`}
              key={item.code}
              onClick={() => {
                setOutfitPart(item.code);
              }}
            >
              {item.name}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default CustomOutfitListPartButton;
