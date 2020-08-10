import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeaf } from '@fortawesome/free-solid-svg-icons';
import './styles.scss';

export const Flower = () => {
  return (
    <div className="container flower">
      <h1 className="flower-header">
        <FontAwesomeIcon icon={faLeaf} />
        <span className="icon-prefix">Flower</span>
      </h1>
    </div>
  );
};
