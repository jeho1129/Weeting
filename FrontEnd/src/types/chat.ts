export interface ChatMessage {
    nickname: string;
    content: string;
    time: string;
  }
  
export  interface ScoreUpdate {
    userId: string;
    score: number;
  }