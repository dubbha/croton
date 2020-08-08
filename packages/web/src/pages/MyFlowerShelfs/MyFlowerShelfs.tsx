import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { getAuth } from 'store/auth/selectors';

import './styles.scss';

export const MyFlowerShelfs = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(getAuth);

  useEffect(() => {
    if (!isAuthenticated) dispatch(push('/signin'));
  }, [isAuthenticated, dispatch]);

  return (
    <div className="my-flower-shelfs">
      <h5>You don&apos;t have any flower pots shelfs yet.</h5>
    </div>
  );
};
