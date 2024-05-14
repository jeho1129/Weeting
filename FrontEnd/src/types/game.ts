import { IngameUser } from './user';

export interface RoomInfo {
  roomMode: 'rank' | 'normal';
  roomId: string;
  roomName: string;
  roomStatus: 'waiting' | 'allready' | 'wordsetting' | 'wordfinish' | 'start' | 'end';
  roomForbiddentime: null | string;
  roomEndtime: null | string;
  roomSubject: null | string;
  roomMaxCnt: number;
  roomUsers: IngameUser[];
}

export interface MessageScore {
  nickname: string;
  highest_similarity: number;
}

// 나중에 지울값
export const dummy2: RoomInfo = {
  roomMode: 'rank',
  roomId: 'd',
  roomName: '테스트 방',
  roomStatus: 'wordsetting',
  roomForbiddentime: '2024-05-13T11:54:46.000',
  roomEndtime: '2024-05-13T11:49:46.000',
  roomSubject: null,
  roomMaxCnt: 8,
  roomUsers: [
    {
      userId: 3,
      nickname: '하하호호',
      ready: false,
      word: '사과',
      score: 16.6,
      isAlive: '',
    },
    { userId: 10, nickname: '허허후후', ready: true, word: '', score: 2, isAlive: '응나도ㅠ' },
    { userId: 9, nickname: '헤엥', ready: true, word: '사탕', score: 3, isAlive: '' },
    { userId: 4, nickname: '웅냥냥', ready: false, word: '안녕', score: 1, isAlive: '' },
    { userId: 5, nickname: '홀롤로', ready: true, word: '바보', score: 4, isAlive: '' },
    { userId: 6, nickname: '웅냐', ready: true, word: '메롱', score: 67, isAlive: '' },
    { userId: 7, nickname: '헤위이잉', ready: true, word: '안녕', score: 1, isAlive: '' },
    { userId: 12, nickname: '....', ready: true, word: '안녕', score: 5, isAlive: '' },
  ],
};
