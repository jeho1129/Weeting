export interface Outfit {
  outfitId: number;
  name: string;
  part: 'all' | 'eyes' | 'head' | 'nametag';
  image: string;
  getCondition: null | number;
  description: string;
  owned: boolean;
}
