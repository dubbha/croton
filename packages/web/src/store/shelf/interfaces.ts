export type Shelf = {
  id: number,
  name: string,
  location: string,
  description: string,
  pictureUrl: string,
}

export type Flower = {
  id: number,
  name: string,
  description: string,
  pictureUrls: string[],
}


export interface ShelfState {
  isLoading: boolean;
  error: string | null;
  info: string | null;
  shelves: Shelf[];
  flowers: Flower[];
}