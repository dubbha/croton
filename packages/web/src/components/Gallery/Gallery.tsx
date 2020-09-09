import React, { useState } from 'react';
import { Carousel, TimesIcon } from 'elements';
import { ConfirmWrapper } from 'components';
import './styles.scss';

type Props = {
  images: string[];
  onDelete: (index: number) => void;
};

export const Gallery = ({ images, onDelete }: Props) => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

  const handleDelete = () => {
    setIndex(0);
    onDelete(index);
  };

  return (
    <Carousel className="gallery" activeIndex={index} onSelect={handleSelect} touch keyboard>
      {images.map((image) => (
        <Carousel.Item key={image.slice(-5)} className="gallery-item">
          <Carousel.Caption>
            <ConfirmWrapper onConfirm={handleDelete}>
              <TimesIcon className="gallery-item-icon" size="2x" />
            </ConfirmWrapper>
          </Carousel.Caption>
          <img className="d-block gallery-image" src={image} alt={`flower${index}`} />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};
