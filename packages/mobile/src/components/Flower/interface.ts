export type FlowerInterface = {
  id: number;
  name: string;
  description?: string;
  pictureUrls?: string[];
  shelfId: number;
  order: number;
  rrules: 'string' | null;
};
