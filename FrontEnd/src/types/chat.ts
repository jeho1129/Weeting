export interface ChatMessage {
    sender: string;
    content: string;
  }
  
export  interface ScoreUpdate {
    memberId: string;
    score: number;
  }