export interface RoomCreateProps {
  roomName: string;
  roomMode: 'rank' | 'normal';
  roomMaxCnt: number;
  roomPassword: number | null;
}