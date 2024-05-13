import { recoilPersist } from 'recoil-persist';
import { User } from '@/types/user';
import { RoomInfo } from '@/types/game';
import { atom, selector } from 'recoil';
import { OutfitItem } from '@/types/custom';

const { persistAtom } = recoilPersist({
  key: 'sessionStorage',
  storage: sessionStorage,
});

// 만약 ingameInfo의 id가 ''가 아니면 게임방으로 이동~

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
    roomId: '',
    roomName: '',
    roomStatus: 'waiting',
    roomForbiddentime: null,
    roomEndtime: null,
    roomSubject: null,
    roomMaxCnt: 0,
    roomUsers: [],
  },
  effects_UNSTABLE: [persistAtom],
});

export const outfitState = atom<OutfitItem[]>({
  key: 'outfitState',
  default: [],
});
