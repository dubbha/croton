import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSeedling } from '@fortawesome/free-solid-svg-icons';
import { ShelfList } from './ShelfList';
import './styles.scss';

export const Shelves = () => {
  // mock data
  const shelves = [
    {
      id: 1,
      name: 'qweqe',
      location: 'some location',
      description: 'description'
    },
    {
      id: 2,
      name: 'My awesome Shelf',
      location: 'Super Location',
      description: 'Description of my awesome shelf'
    },
    {
      id: 3,
      name: 'qweqe',
      location: 'some location',
      description: 'description'
    },
    {
      id: 4,
      name: 'My awesome Shelf',
      location: 'Super Location',
      description: 'Description of my awesome shelfDescription of my awesome shelfDescription of my awesome shelfDescription of my awesome shelfDescription of my awesome shelfDescription of my awesome shelf'
    },
    {
      id: 5,
      name: 'qweqe',
      location: 'some location',
      description: 'description'
    },
    {
      id: 6,
      name: 'My awesome Shelf',
      location: 'Super Location',
      description: 'Description of my awesome shelf'
    },
    {
      id: 7,
      name: 'qweqe',
      location: 'some location',
      description: 'description'
    },
    {
      id: 8,
      name: 'My awesome Shelf',
      location: 'Super Location',
      description: 'Description of my awesome shelf'
    },
    {
      id: 9,
      name: 'qweqe',
      location: 'some location',
      description: 'description'
    },
    {
      id: 10,
      name: 'My awesome Shelf',
      location: 'Super Location',
      description: 'Description of my awesome shelfDescription of my awesome shelfDescription of my awesome shelfDescription of my awesome shelf'
    },
  ];
  // end mock data

  return (
    <div className="container shelves">
      <h1 className="shelves-header">
        <FontAwesomeIcon icon={faSeedling} />
        <span className="icon-prefix">My Shelves</span>
      </h1>
      { shelves.length
        ? <ShelfList shelves={shelves} />
        : (
          <div className="shelves-empty">
            <h4>You Don&#39;t Have Any Shelves Yet</h4>
            <Link to="/profile/add-shelf">Create Shelf</Link>
          </div>
        )}
    </div>
  );
};
