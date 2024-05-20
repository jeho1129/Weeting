export interface Outfit {
  outfitId: number;
  name: string;
  part: 'all' | 'eyes' | 'head' | 'nametag';
  image: string;
  getCondition: null | number;
  description: string;
  owned: boolean;
}

export interface OutfitItem {
  userId: number;
  outfitId: number;
  part: 'all' | 'eyes' | 'head' | 'nametag';
  image: string;
}

export interface OutfitSet {
  eyes: OutfitItem | null;
  head: OutfitItem | null;
  nametag: OutfitItem | null;
}

export const dummyOutfit: Outfit[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((it) => ({
  outfitId: 1000000 + it,
  name: '',
  part: 'all',
  image: '',
  getCondition: null,
  description: '',
  owned: true,
}));
