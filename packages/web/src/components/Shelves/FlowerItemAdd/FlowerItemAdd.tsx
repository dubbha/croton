import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Card } from 'react-bootstrap';

import '../styles.scss';

type Props = {
  onSelect: () => void
}

export const FlowerItemAdd = ({ onSelect }: Props) => {
  return (
    <div className="flower-item">
      <Card text="primary" onClick={onSelect}>
        <div className="shelf-item-new">
          <Card.Title>
            <FontAwesomeIcon icon={faPlus} />
            <span className="icon-prefix">Add New Flower</span>
          </Card.Title>
        </div>
      </Card>
    </div>
  );
};
