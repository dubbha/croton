import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { AddNewShelfForm } from 'components';
import { getAuth } from 'store/auth/selectors';

import './styles.scss';

export const FlowerShelvesManagement = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(getAuth);

  useEffect(() => {
    if (!isAuthenticated) dispatch(push('/signin'));
  }, [isAuthenticated, dispatch]);

  const handleSubmit = (name: string, location: string, description: string) => {
    console.log(`submitted! shelf name -  ${name}. Location - ${location}, description - ${description}`);
  };

  return (
    <div className="shelves-management">
      <h4>Create a New Shelf</h4>
      <p>Add new flower shelf, describe location and small description.</p>
      <AddNewShelfForm onSubmit={handleSubmit} />
    </div>
  );
};
