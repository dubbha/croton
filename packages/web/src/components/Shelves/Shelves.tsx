import React from 'react';
import { Container } from 'components';
import { SeedlingIcon } from 'elements';
import { ShelfList } from './ShelfList';
import './styles.scss';

export const Shelves = () => (
  <Container inner>
    <div className="shelves">
      <h1 className="shelves-header">
        <SeedlingIcon />
        <span className="icon-prefix">My Shelves</span>
      </h1>
      <ShelfList />
    </div>
  </Container>
);
