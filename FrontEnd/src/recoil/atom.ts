import { recoilPersist } from 'recoil-persist';
import { User } from '@/types/user';
import { atom, selector } from 'recoil';
import { getCookie } from '@/utils/axios';

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
    ranking: null,
  },
  effects_UNSTABLE: [persistAtom],
});
