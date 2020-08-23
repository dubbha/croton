import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, BookmarkIcon } from 'elements';
import { getShelf } from 'store/shelf/selectors';
import { SHELF_EDIT_SHELF } from 'store/shelf';
import { ShelfForm } from '../ShelfForm';

type Props = {
  id: number;
  initialValues?: { name: string; location: string; description: string };
  onClose?: () => void;
};

export const EditShelf = ({ id, initialValues, onClose = () => {} }: Props) => {
  const [showModal, setShowModal] = useState(false);

  const { isLoading, info, error } = useSelector(getShelf);
  const dispatch = useDispatch();

  const handleSubmit = (name: string, location: string, description: string) =>
    dispatch({
      type: SHELF_EDIT_SHELF,
      payload: { id, name, description, location },
    });

  const handleClose = () => {
    setShowModal(false);
    onClose();
  };

  return (
    <>
      <Button variant="outline-primary" onClick={() => setShowModal(true)}>
        Edit Shelf
      </Button>
      <Modal
        show={showModal}
        onHide={handleClose}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <BookmarkIcon />
            <span className="icon-prefix">
              Edit Shelf
            </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ShelfForm
            onSubmit={handleSubmit}
            info={info}
            error={error}
            isLoading={isLoading}
            initialValues={initialValues}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};
