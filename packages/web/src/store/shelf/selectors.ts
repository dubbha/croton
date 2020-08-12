import { AppState } from '../index';
import { ShelfState } from './interfaces';

export const getShelf = (state: AppState): ShelfState => state.shelf;
