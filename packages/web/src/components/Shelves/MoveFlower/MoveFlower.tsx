import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, BookmarkIcon } from 'elements';
import { getShelf } from 'store/shelf/selectors';
import { SHELF_MOVE_FLOWER } from 'store/shelf';
import { MoveFlowerForm } from '../MoveFlowerForm';

type Props = {
  flowerId: number;
  flowerName?: string;
  currentShelfId?: number;
};

export const MoveFlower = ({ flowerId, flowerName, currentShelfId }: Props) => {
  const [showModal, setShowModal] = useState(false);

  const { shelves, error } = useSelector(getShelf);
  const dispatch = useDispatch();

  const handleClose = () => {
    setShowModal(false);
  };

  const moveFlower = (targetShelfId: number): void => {
    dispatch({
      type: SHELF_MOVE_FLOWER,
      payload: { flowerId, targetShelfId, currentShelfId },
    });
  };

  if (shelves.length < 2) {
    return null;
  }

  return (
    <>
      <Button variant="outline-primary" onClick={() => setShowModal(true)}>
        Move Flower
      </Button>
      <Modal show={showModal} onHide={handleClose} size="xl" centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <BookmarkIcon />
            <span className="icon-prefix">Move Flower {flowerName}</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span className="icon-prefix">
            The current shelf to your flower is {}
          </span>
          <span className="icon-prefix">
            Please, select another shelf for your flower from your shelves
          </span>
          <MoveFlowerForm
            onSubmit={moveFlower}
            shelves={shelves}
            error={error}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};
