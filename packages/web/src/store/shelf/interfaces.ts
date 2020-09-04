import { Actions } from 'constants/actions';

export type Shelf = {
  id: number,
  name: string,
  location: string,
  description: string,
  pictureUrl: string,
}

export type FlowerRrules = { [key in Actions]: string };

export type FlowerLastActions = {
  [key in Actions]: {
    timestamp: number;
    user: { id: number, firstName: string, lastName: string };
  }
};

export type FlowerAction = {
  timestamp: number;
  action: Actions;
  firstName: string;
  lastName: string;
};

export type Flower = {
  id: number;
  name: string;
  description: string;
  pictureUrls: string[];
  rrules: FlowerRrules;
  lastActions: FlowerLastActions;
  actions: FlowerAction[];
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
