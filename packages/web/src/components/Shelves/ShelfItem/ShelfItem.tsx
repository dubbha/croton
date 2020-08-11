import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { Card } from 'react-bootstrap';

import '../styles.scss';

export type ShelfItemProps = {
  id: number,
  name: string,
  location: string,
  description: string,
  onSelect: (id: number) => void
}

export const ShelfItem = ({
  id,
  name,
  location,
  description,
  onSelect,
} :ShelfItemProps) => {
  return (
    <div className="shelf-item">
      <Card text="primary" onClick={() => onSelect(id)}>
        <Card.Img variant="top" src="" />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            <FontAwesomeIcon icon={faMapMarkerAlt} />
            <span className="icon-prefix">{location}</span>
          </Card.Subtitle>
          <Card.Text>
            {description}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};
