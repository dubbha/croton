import React from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { ShelfItem } from '../ShelfItem';
import { ShelfItemAdd } from '../ShelfItemAdd';

import './styles.scss';

type Shelf = {
  id: number,
  name: string,
  location: string,
  description: string
}

type Props = {
  shelves: Shelf[]
}

export const ShelfList = ({ shelves }: Props) => {
  const dispatch = useDispatch();

  const handleShelfSelect = (id: number) => dispatch(push(`/profile/shelf/${id}`));
  const createShelf = () => dispatch(push('/profile/add-shelf'));

  return (
    <div className="shelf-list row">
      {shelves.map((shelf) => (
        <ShelfItem
          key={shelf.id}
          id={shelf.id}
          name={shelf.name}
          location={shelf.location}
          description={shelf.description}
          onSelect={handleShelfSelect}
        />
      ))}
      <ShelfItemAdd onSelect={createShelf} />
    </div>
  );
};
