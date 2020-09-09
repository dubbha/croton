import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './styles.scss';

type Props = {
  images: string[];
};

export const Gallery = ({ images }: Props) => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel className="gallery col-md-6" activeIndex={index} onSelect={handleSelect} touch keyboard>
      {images.map((image) => (
        <Carousel.Item key={image.slice(-5)} className="gallery-item">
          <img className="d-block gallery-image" src={image} alt={`flower${index}`} />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};
