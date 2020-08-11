import React from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { FlowerItem } from '../FlowerItem';
import { FlowerItemAdd } from '../FlowerItemAdd';

import './styles.scss';

type Flower = {
  id: number,
  name: string,
  description: string
}

type Props = {
  flowers?: Flower[]
}

export const FlowersList = ({ flowers = [] }: Props) => {
  const dispatch = useDispatch();

  const selectFlower = (id) => dispatch(push(`/profile/flower/${id}`));
  const addFlower = () => dispatch(push('/profile/add-flower'));

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
      <FlowerItemAdd onSelect={addFlower} />
    </div>
  );
};
