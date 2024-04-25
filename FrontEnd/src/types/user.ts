import { ChangeEvent } from 'react';
export interface Login {
  id: string;
  password: string;
}

export interface Signup {
  account: string;
  nickname: string;
  password: string;
}

export interface User {
  memberId: number;
  nickname: string;
  score: number;
  ranking: number | null;
}

export interface MainSignupFormIdProps {
  id: string;
  onIdHandler: (event: ChangeEvent<HTMLInputElement>) => void;
}

export interface MainSignupFormNicknameProps {
  nickname: string;
  onNicknameHandler: (event: ChangeEvent<HTMLInputElement>) => void;
}

export interface MainSignupFormPasswordProps {
  password: string;
  onPasswordHandler: (event: ChangeEvent<HTMLInputElement>) => void;
}

export interface MainSignupFormPasswordCheckProps {
  passwordCheck: string;
  onPasswordCheckHandler: (event: ChangeEvent<HTMLInputElement>) => void;
}