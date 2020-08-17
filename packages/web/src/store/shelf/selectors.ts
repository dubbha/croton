import { AppState } from '../interfaces';
import { ShelfState } from './interfaces';

export const getShelf = (state: AppState): ShelfState => state.shelf;
