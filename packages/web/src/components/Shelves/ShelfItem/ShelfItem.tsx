import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Card } from 'react-bootstrap';

import './styles.scss';

export type ShelfItemProps = {
  id: string
  name: string,
  location: string,
  description: string,
  addNew?: boolean,
  onSelect: (id: string) => void
}

export const ShelfItem = ({
  id,
  name,
  location,
  description,
  addNew = false,
  onSelect
} :ShelfItemProps) => {
  return (
    <div className="shelf-item">
      {addNew
        ? (
          <Card text="primary" onClick={() => onSelect(id)}>
            <div className="shelf-item-new">
              <Card.Title>
                <FontAwesomeIcon icon={faPlus} />
                <span className="icon-prefix">Add New Shelf</span>
              </Card.Title>
            </div>
          </Card>
        )
        : (
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
        )}
    </div>
  );
};
