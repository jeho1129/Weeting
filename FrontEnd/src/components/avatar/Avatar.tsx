import AvatarFirst from './AvatarFirst';
import { AvatarProps } from '@/types/avatar';
import { outfitNowApi } from '@/services/customApi';
import { useEffect, useState } from 'react';
import { OutfitItem } from '@/types/custom';

const Avatar = ({ userId, size, location, options }: AvatarProps) => {
  const [outfit, setOutfit] = useState<OutfitItem[]>([]);
  const isNest = options?.isNest !== null && options?.isNest !== undefined ? options.isNest : false;
  const isAlive = options?.isAlive !== null && options?.isAlive !== undefined ? options.isAlive : true;
  const nickname = options?.nickname !== null && options?.nickname !== undefined ? options.nickname : '';

  useEffect(() => {
    outfitNowApi(userId).then((data) => {
      setOutfit(data);
    });
  }, []);

  return (
    <div>
      <AvatarFirst
        {...{
          size,
          outfit,
          location,
          options: { isAlive: isAlive, isNest: isNest, nickname: nickname },
        }}
      />
    </div>
  );
};

export default Avatar;
