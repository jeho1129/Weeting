import { IngameUser } from "./user";

export interface RoomInfo {
    roomid: string;
    roomname: string;
    roomstatus: 'waiting' | 'allready' | 'wordsetting' | 'wordfinish' | 'start' | 'end';
    roomforbiddentime: null|string;
    roomendtime: null|string;
    roommaxcnt: number;
    roommembers: IngameUser[];
  }
  