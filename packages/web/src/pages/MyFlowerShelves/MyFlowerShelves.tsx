import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { getAuth } from 'store/auth/selectors';

import './styles.scss';

export const MyFlowerShelves = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(getAuth);

  useEffect(() => {
    if (!isAuthenticated) dispatch(push('/signin'));
  }, [isAuthenticated, dispatch]);

  return (
    <div className="my-flower-shelves">
      <h5>You don&apos;t have any flower pots shelves yet.</h5>
    </div>
  );
};
