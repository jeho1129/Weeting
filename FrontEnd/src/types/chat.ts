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
