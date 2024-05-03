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
