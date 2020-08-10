import React from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { ShelfItem } from '../ShelfItem';

import './styles.scss';

type ShelfProp = {
  id: string,
  name: string,
  location: string,
  description: string
}

type Props = {
  shelvesList: ShelfProp[]
}

export const ShelfList = ({ shelvesList }: Props) => {
  const dispatch = useDispatch();

  const handleShelfSelect = (id) => dispatch(push(`/profile/shelf/${id}`));
  const createShelf = () => dispatch(push('/profile/add-shelf'));

  return (
    <div className="shelf-list row">
      {shelvesList.map((shelf) => (
        <ShelfItem
          key={shelf.id}
          id={shelf.id}
          name={shelf.name}
          location={shelf.location}
          description={shelf.description}
          onSelect={handleShelfSelect}
        />
      ))}
      <ShelfItem id="" name="" location="" description="" addNew onSelect={createShelf} />
    </div>
  );
};
