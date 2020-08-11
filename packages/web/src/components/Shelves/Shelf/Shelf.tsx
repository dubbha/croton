import React from 'react';
// import { useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeaf } from '@fortawesome/free-solid-svg-icons';
// import { getShelf } from '../../../store/shelf/selectors';

import './styles.scss';
import { Link } from 'react-router-dom';
import { FlowersList } from '../FlowersList';

type Props = {
  id: string
}

export const Shelf = ({
  id
}: Props) => {
  // const {
  //   isLoading,
  //   error,
  //   info
  // } = useSelector(getShelf);
  const flowers = [
    {
      id: 0,
      name: 'flowerName',
      description: 'Very Important Description',
    },
    {
      id: 1,
      name: 'anotherFlower',
      description: 'Another Description',
    },
  ];

  return (
    <div className="container shelf">
      <h1 className="shelf-header">
        <FontAwesomeIcon icon={faLeaf} />
        <span className="icon-prefix">Shelf Name</span>
      </h1>
      <div className="shelf-actions">
        <Button variant="outline-primary">Edit Shelf</Button>
        <Button variant="outline-primary">Add People</Button>
      </div>
      { flowers.length
        ? <FlowersList flowers={flowers} />
        : (
          <div className="shelf-empty">
            <h4>You Don&#39;t Have Any Flower In This Shelf Yet</h4>
            <Link to="/profile/add-flower">Add Flower</Link>
          </div>
        )}
    </div>
  );
};
