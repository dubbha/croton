import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getShelf } from 'store/shelf/selectors';
import { SHELF_MOVE_FLOWER, Shelf } from 'store/shelf';

import { Modal, Button, BookmarkIcon } from 'elements';

import { MoveFlowerForm } from '../MoveFlowerForm';

import './styles.scss';

type Props = {
  flowerId: number;
  flowerName?: string;
  shelfId?: number | null;
}

export const MoveFlower = ({ flowerId, flowerName = '', shelfId = null }: Props) => {
  const [showModal, setShowModal] = useState(false);

  const { shelves, error, info } = useSelector(getShelf);
  const dispatch = useDispatch();

  const handleClose = () => {
    setShowModal(false);
  };

  const moveFlower = (targetShelfId: number): void => {
    dispatch({
      type: SHELF_MOVE_FLOWER,
      payload: { flowerId, targetShelfId, shelfId },
    });
    return undefined;
  };

  React.useEffect(() => {
    if (info) {
      const timeoutId = setTimeout(() => {
        handleClose();
      }, 2000);
      return () => { clearTimeout(timeoutId); };
    }
  }, [info]);

  const [currentSelf, ...possibleTargetShelves] = shelves.reduce((acc, shelf) => {
    if (Number(shelfId) === Number(shelf.id)) {
      acc.unshift(shelf);
    } else {
      acc.push(shelf);
    }
    return acc;
  }, [] as Shelf[]);

  return (
    (possibleTargetShelves.length === 0) ? null
      : (
        <>
          <Button variant="outline-primary" onClick={() => setShowModal(true)}>
            Move Flower
          </Button>
          <Modal show={showModal} onHide={handleClose} size="xl" centered>
            <Modal.Header closeButton>
              <Modal.Title>
                <BookmarkIcon />
                <span className="icon-prefix">Move Flower <strong>{flowerName}</strong></span>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4 className="moveFlowerModalSubtitle">
                The current shelf is{' '}
                <strong>{currentSelf?.name}</strong>
              </h4>
              <MoveFlowerForm
                onSubmit={moveFlower}
                shelves={possibleTargetShelves}
                error={error}
                info={info}
                flowerName={flowerName}
              />
            </Modal.Body>
          </Modal>
        </>
      )
  );
};
