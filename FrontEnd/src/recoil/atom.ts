import { recoilPersist } from 'recoil-persist';
import { User } from '@/types/user';
import { atom, selector } from 'recoil';
import { OutfitItem } from '@/types/custom';

const { persistAtom } = recoilPersist({
  key: 'sessionStorage',
  storage: sessionStorage,
});

export const userState = atom<User>({
  key: 'userState',
  default: {
    userId: 0,
    nickname: '',
    score: 1000,
    ranking: 0,
  },
  effects_UNSTABLE: [persistAtom],
});

export const outfitState = atom<OutfitItem[]>({
  key: 'outfitState',
  default: [],
});
