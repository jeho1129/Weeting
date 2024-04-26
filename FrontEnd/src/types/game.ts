import { IngameUser } from "./user";

export interface RoomInfo {
    roomid: string;
    roomname: string;
    roomstatus: string;
    roomforbiddentime: null|string;
    roomendtime: null|string;
    roommaxcnt: number;
    roommembers: IngameUser[];
  }
  