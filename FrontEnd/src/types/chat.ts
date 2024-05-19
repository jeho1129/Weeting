export interface ChatMessage {
  userId: number;
  nickname: string;
  content: string;
  sendTime: string;
}

export interface ScoreUpdate {
  userId: string;
  score: number;
}

export interface ChatMessages {
  id: string;
  roomId: string;
  userId: number;
  nickname: string;
  content: string;
  sendTime: string | null;
}
