import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { getShelf } from 'store/shelf/selectors';
import { SHELF_GET_FLOWERS } from 'store/shelf';
import { FlowerItem } from '../FlowerItem';
import { AddFlower } from '../AddFlower';

import './styles.scss';

type Props = {
  shelfId: number,
}

export const FlowerList = ({ shelfId }: Props) => {
  const dispatch = useDispatch();
  const { flowers } = useSelector(getShelf);

  useEffect(() => {
    dispatch({ type: SHELF_GET_FLOWERS, payload: { shelfId } })
  }, [dispatch, shelfId]);

  const selectFlower = (id) => dispatch(push(`/profile/flower/${id}`));
  const refreshFlowers = () => dispatch({ type: SHELF_GET_FLOWERS, payload: { shelfId } })

  return (
    <div className="flowers-list row">
      {flowers.map(({ id, name, description }) => (
        <FlowerItem
          key={id}
          id={id}
          name={name}
          description={description}
          onSelect={selectFlower}
        />
      ))}
      <AddFlower shelfId={shelfId} onClose={refreshFlowers} />
    </div>
  );
};
