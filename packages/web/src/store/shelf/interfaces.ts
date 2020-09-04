import { Actions } from 'constants/actions';

export type Shelf = {
  id: number,
  name: string,
  location: string,
  description: string,
  pictureUrl: string,
}

export type Flower = {
  id: number;
  name: string;
  description: string;
  pictureUrls: string[];
  rrules: { [key in Actions]: string };
  lastActions: {
    [key in Actions]: {
      timestamp: number;
      user: { id: number, firstName: string, lastName: string };
    }
  };
  shelfId: number;
}

export type Invite = {
  id: number;
  userEmail: string;
  expiresIn: string;
}

export interface ShelfState {
  isLoading: boolean;
  error: string | null;
  info: string | null;
  shelves: Shelf[];
  flowers: Flower[];
  flower: Flower | null;
  invites: Invite[];
}
