import { OutfitItem } from './custom';

export interface AvatarProps {
  userId: number;
  size: number;
  location: 'Home' | 'Ingame' | 'Custom' | 'Ranking' | 'Room';
  options?: {
    nickname?: string;
    isNest: boolean;
    isAlive?: boolean;
  };
}

export interface AvatarFirstProps {
  size: number;
  outfit: OutfitItem[];
  location: 'Home' | 'Ingame' | 'Custom' | 'Ranking' | 'Room';
  options?: {
    nickname?: string;
    isNest: boolean;
    isAlive?: boolean;
  };
}
