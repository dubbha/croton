import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { getShelf } from 'store/shelf/selectors';
import { SHELF_GET_SHELVES } from 'store/shelf';
import { ShelfItem } from '../ShelfItem';
import { AddShelf } from '../AddShelf';

import './styles.scss';

export const ShelfList = () => {
  const dispatch = useDispatch();
  const { shelves } = useSelector(getShelf);

  useEffect(() => {
    dispatch({ type: SHELF_GET_SHELVES });
  }, [dispatch]);

  const selectShelf = (id: number) => dispatch(push(`/profile/shelf/${id}`));
  const refreshShelves = () => dispatch({ type: SHELF_GET_SHELVES });

  return (
    <div className="shelf-list row">
      {shelves.map((shelf) => (
        <ShelfItem
          key={shelf.id}
          id={shelf.id}
          name={shelf.name}
          location={shelf.location}
          description={shelf.description}
          onSelect={selectShelf}
        />
      ))}
      <AddShelf onClose={refreshShelves} />
    </div>
  );
};
