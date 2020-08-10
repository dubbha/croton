import React from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { FlowerItem } from '../FlowerItem';

import './styles.scss';

type FlowerProp = {
  id: string,
  name: string,
  description: string
}

type Props = {
  flowersList: FlowerProp[]
}

export const FlowersList = ({ flowersList }: Props) => {
  const dispatch = useDispatch();

  const selectFlower = (id) => dispatch(push(`/profile/flower/${id}`));
  const addFlower = () => dispatch(push('/profile/add-flower'));

  return (
    <div className="flowers-list row">
      {flowersList.map((flower) => (
        <FlowerItem
          key={flower.id}
          id={flower.id}
          name={flower.name}
          description={flower.description}
          onSelect={selectFlower}
        />
      ))}
      <FlowerItem id="" name="" description="" addNew onSelect={addFlower} />
    </div>
  );
};
