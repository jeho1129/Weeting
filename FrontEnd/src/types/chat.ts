export interface ChatMessage {
    sender: string;
    content: string;
  }
  
export  interface ScoreUpdate {
    userId: string;
    score: number;
  }