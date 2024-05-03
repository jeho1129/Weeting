import { IngameUser } from "./user";

export interface RoomCreateProps {
  roomName: string;
  roomMode: 'rank' | 'normal';
  roomMaxCnt: number;
  roomPassword: number | null;
}


export interface RoomWaitInfo {
  roomMode:'rank' | 'normal'
  roomId: string;
  roomName: string;
  roomStatus: 'waiting' | 'allready' | 'wordsetting' | 'wordokay' | 'start' | 'end';
  roomMaxCnt: number;
  roomUsers: IngameUser[];
}
  