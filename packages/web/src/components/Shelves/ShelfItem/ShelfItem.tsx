import React from 'react';
import { MapMarkerIcon, Card } from 'elements';

import '../styles.scss';

export type Props = {
  id: number;
  name: string;
  location: string;
  description: string;
  onSelect: (id: number) => void;
}

export const ShelfItem = ({
  id,
  name,
  location,
  description,
  onSelect,
}: Props) => (
  <div className="shelf-item">
    <Card text="primary" onClick={() => onSelect(id)}>
      <Card.Img variant="top" src="" />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          <MapMarkerIcon />
          <span className="icon-prefix">{location}</span>
        </Card.Subtitle>
        <Card.Text>
          {description}
        </Card.Text>
      </Card.Body>
    </Card>
  </div>
);
