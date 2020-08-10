import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Card } from 'react-bootstrap';

import './styles.scss';

export type FlowerItemPrors = {
  id: string
  name: string,
  description: string,
  addNew?: boolean,
  onSelect: (id: string) => void
}

export const FlowerItem = ({
  id,
  name,
  description,
  addNew = false,
  onSelect
} :FlowerItemPrors) => {
  return (
    <div className="shelf-item">
      {addNew
        ? (
          <Card text="primary" onClick={() => onSelect(id)}>
            <div className="shelf-item-new">
              <Card.Title>
                <FontAwesomeIcon icon={faPlus} />
                <span className="icon-prefix">Add New Flower</span>
              </Card.Title>
            </div>
          </Card>
        )
        : (
          <Card text="primary" onClick={() => onSelect(id)}>
            <Card.Img variant="top" src="" />
            <Card.Body>
              <Card.Title>{name}</Card.Title>
              <Card.Text>
                {description}
              </Card.Text>
            </Card.Body>
          </Card>
        )}
    </div>
  );
};
