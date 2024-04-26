import { ChangeEvent } from 'react';
export interface Login {
  account: string;
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
  idPossible: number;
  idCheckHandler: (isPossible: number) => void;
}

export interface MainSignupFormNicknameProps {
  nickname: string;
  onNicknameHandler: (event: ChangeEvent<HTMLInputElement>) => void;
  nicknamePossible: number;
  nicknameCheckHandler: (isPossible: number) => void;
}

export interface MainSignupFormPasswordProps {
  password: string;
  onPasswordHandler: (event: ChangeEvent<HTMLInputElement>) => void;
}

export interface MainSignupFormPasswordCheckProps {
  password: string;
  passwordCheck: string;
  onPasswordCheckHandler: (event: ChangeEvent<HTMLInputElement>) => void;
}

export interface SignupIdCheck {
  account: string;
}

export interface SignupNicknameCheck {
  nickname: string;
}
