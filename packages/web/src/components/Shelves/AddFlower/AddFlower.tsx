import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, PlusIcon, BookmarkIcon, Card } from 'elements';
import { getShelf } from 'store/shelf/selectors';
import { SHELF_ADD_FLOWER } from 'store/shelf';
import { FlowerForm } from '../FlowerForm';

type Props = {
  shelfId: number;
  onClose?: () => void;
}

export const AddFlower = ({ shelfId, onClose = () => {} }: Props) => {
  const [showModal, setShowModal] = useState(false);
  const { isLoading, info, error } = useSelector(getShelf);
  const dispatch = useDispatch();

  const handleSubmit = (name: string, description: string) =>
    dispatch({
      type: SHELF_ADD_FLOWER,
      payload: { shelfId, name, description },
    });

  const handleClose = () => {
    setShowModal(false);
    onClose();
  }

  return (
    <>
      <div className="shelf-item">
        <Card text="primary" onClick={() => setShowModal(true)}>
          <div className="shelf-item-new">
            <Card.Title>
              <PlusIcon />
              <span className="icon-prefix">
                Add Flower
              </span>
            </Card.Title>
          </div>
        </Card>
      </div>
      <Modal
        show={showModal}
        onHide={handleClose}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <BookmarkIcon />
            <span className="icon-prefix">Add Flower to Shelf</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FlowerForm
            onSubmit={handleSubmit}
            isLoading={isLoading}
            info={info}
            error={error}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};
