import React from 'react';
import { SeedlingIcon } from 'elements';
import { ShelfList } from './ShelfList';
import './styles.scss';

export const Shelves = () => (
  <div className="container shelves">
    <h1 className="shelves-header">
      <SeedlingIcon />
      <span className="icon-prefix">My Shelves</span>
    </h1>
    <ShelfList />
  </div>
);
