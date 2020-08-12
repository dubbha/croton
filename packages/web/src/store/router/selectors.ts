import { createSelector } from 'reselect';

import { AppState } from '../interfaces';

export const getRouter = (state: AppState) => state.router;

export const getLocation = createSelector(
  getRouter,
  router => router.location as any // https://github.com/supasate/connected-react-router/pull/410
);

export const getQuery = createSelector(
  getLocation,
  location => location.query
);
