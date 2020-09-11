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

export type Image = {
  id: number,
  image: string,
}

export type Flower = {
  id: number;
  name: string;
  description: string;
  images: Image[];
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

export type UserDetails = {
  firstName: string;
  lastName: string;
  email: string;
  status: string;
}

export type User = {
  userId: number;
  shelfId: number;
  isAdmin: boolean;
  user: UserDetails;
}

export interface ShelfState {
  isLoading: boolean;
  error: string | null;
  info: string | null;
  shelves: Shelf[];
  flowers: Flower[];
  flower: Flower | null;
  invites: Invite[];
  users: User[];
}
