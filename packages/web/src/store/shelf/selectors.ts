import { AppState } from '../index';
import { createSelector } from 'reselect';
import { ShelfState } from './interfaces';

export const getShelf = (state: AppState): ShelfState => state.shelf;

export const getFlowers = createSelector(
  getShelf,
  shelf => shelf.flowers,
)

export const getFlower = createSelector(
  getShelf,
  shelf => shelf.flower,
)
