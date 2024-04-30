import { IngameUser } from "./user";

export interface RoomInfo {
  roommode:'rank' | 'normal'
    roomid: string;
    roomname: string;
    roomstatus: 'waiting' | 'allready' | 'wordsetting' | 'wordokay' | 'start' | 'end';
    roomforbiddentime: null|string;
    roomendtime: null|string;
    roommaxcnt: number;
    roommembers: IngameUser[];
  }
  