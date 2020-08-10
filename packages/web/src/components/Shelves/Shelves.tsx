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
      id: 'key1',
      name: 'qweqe',
      location: 'some location',
      description: 'description'
    },
    {
      id: 'key2',
      name: 'My awesome Shelf',
      location: 'Super Location',
      description: 'Description of my awesome shelf'
    },
    {
      id: 'key3',
      name: 'qweqe',
      location: 'some location',
      description: 'description'
    },
    {
      id: 'key4',
      name: 'My awesome Shelf',
      location: 'Super Location',
      description: 'Description of my awesome shelfDescription of my awesome shelfDescription of my awesome shelfDescription of my awesome shelfDescription of my awesome shelfDescription of my awesome shelf'
    },
    {
      id: 'key5',
      name: 'qweqe',
      location: 'some location',
      description: 'description'
    },
    {
      id: 'key6',
      name: 'My awesome Shelf',
      location: 'Super Location',
      description: 'Description of my awesome shelf'
    },
    {
      id: 'key7',
      name: 'qweqe',
      location: 'some location',
      description: 'description'
    },
    {
      id: 'key8',
      name: 'My awesome Shelf',
      location: 'Super Location',
      description: 'Description of my awesome shelf'
    },
    {
      id: 'key9',
      name: 'qweqe',
      location: 'some location',
      description: 'description'
    },
    {
      id: 'key10',
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
        ? <ShelfList shelvesList={shelves} />
        : (
          <div className="shelves-empty">
            <h4>You Don&#39;t Have Any Shelves Yet</h4>
            <Link to="/profile/add-shelf">Create Shelf</Link>
          </div>
        )}
    </div>
  );
};
