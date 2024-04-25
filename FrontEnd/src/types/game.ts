interface RoomInfo {
    roomid: string;
    roomname: string;
    roomstatus: string;
    roommembers: {
      memberid: string;
      nickname: string;
      outfit: string;
      score: number;
      ready: boolean;
    }[];
  }
  