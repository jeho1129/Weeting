import { recoilPersist } from 'recoil-persist';
import { User } from '@/types/user';
import { RoomInfo } from '@/types/game';
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

export const gameState = atom<RoomInfo>({
  key: 'gameState',
  default: {
    roomMode: 'rank',
    roomId: 0,
    roomName: '',
    roomStatus: 'waiting',
    roomForbiddentime: null,
    roomEndtime: null,
    roomSubject: null,
    roomMaxCnt: 0,
    roomUsers: []
  },
});

export const outfitState = atom<OutfitItem[]>({
  key: 'outfitState',
  default: [],
});
