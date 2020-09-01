import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Card, BookmarkIcon, PlusIcon } from 'elements';
import { getShelf } from 'store/shelf/selectors';
import { SHELF_ADD_SHELF } from 'store/shelf';
import { ShelfForm } from '../ShelfForm';

type Props = {
  onClose?: () => void;
}

export const AddShelf = ({ onClose = () => {} }: Props) => {
  const [showModal, setShowModal] = useState(false);

  const { isLoading, info, error } = useSelector(getShelf);
  const dispatch = useDispatch();

  const handleSubmit = (name: string, location: string, description: string) =>
    dispatch({
      type: SHELF_ADD_SHELF,
      payload: { name, description, location },
    });

  const handleClose = () => {
    setShowModal(false);
    onClose();
  };

  return (
    <>
      <div className="shelf-item">
        <Card text="primary" onClick={() => setShowModal(true)}>
          <div className="shelf-item-new">
            <Card.Title>
              <PlusIcon />
              <span className="icon-prefix">Add Shelf</span>
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
            <span className="icon-prefix">Add Shelf</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ShelfForm
            onSubmit={handleSubmit}
            info={info}
            error={error}
            isLoading={isLoading}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};
