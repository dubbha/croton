import React from 'react';
import { Card } from 'react-bootstrap';

import '../styles.scss';

type Props = {
  id: number;
  name: string;
  description: string;
  onSelect: (id: number) => void;
}

export const FlowerItem = ({
  id,
  name,
  description,
  onSelect,
}: Props) => (
  <div className="flower-item">
    <Card text="primary" onClick={() => onSelect(id)}>
      <Card.Img variant="top" src="" />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          {description}
        </Card.Text>
      </Card.Body>
    </Card>
  </div>
);
