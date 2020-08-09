import { AppState } from '../index';
import { ShelfState } from './reducer';

export const getShelf = (state: AppState): ShelfState => state.shelf;
