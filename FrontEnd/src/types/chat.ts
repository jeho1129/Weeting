export interface ChatMessage {
  userId: number;
  nickname: string;
  content: string;
  time: string;
}

export interface ScoreUpdate {
  userId: string;
  score: number;
}
