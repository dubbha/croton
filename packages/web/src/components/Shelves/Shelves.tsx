import React from 'react';
import { AddNewShelfForm } from './AddNewShelfForm';
import { ShelfList } from './ShelfList';
import './styles.scss';

export const Shelves = () => {
  const shelves = [];

  const handleSubmit = (name: string, location: string, description: string) => {
    console.log(`submitted! shelf name -  ${name}. Location - ${location}, description - ${description}`);
  };

  return (
    shelves.length
      ? <ShelfList />
      : (
        <div className="shelves">
          <h4>Create a New Shelf</h4>
          <p>Add new flower shelf, describe location and small description.</p>
          <AddNewShelfForm onSubmit={handleSubmit} />
        </div>
      )
  );
};
