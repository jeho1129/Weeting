import { IngameUser } from "./user";

export interface RoomInfo {
  roomMode:'rank' | 'normal'
  roomId: string;
  roomName: string;
  roomStatus: 'waiting' | 'allready' | 'wordsetting' | 'wordokay' | 'start' | 'end';
  roomForbiddentime: null|string;
  roomEndtime: null|string;
  roomSubject: null|string;
  roomMaxCnt: number;
  roomUsers: IngameUser[];
}
  