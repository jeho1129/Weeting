export interface Login {
  id: string;
  password: string;
}

export interface Signup {
  id: string;
  nickname: string;
  password: string;
}

export interface User {
  memberId: number;
  nickname: string;
  score: number;
  ranking: number | null;
}
