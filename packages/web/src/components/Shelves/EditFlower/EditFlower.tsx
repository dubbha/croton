import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, BookmarkIcon } from 'elements';
import { getShelf } from 'store/shelf/selectors';
import { SHELF_EDIT_FLOWER } from 'store/shelf';
import { Actions } from 'constants/actions';
import { FlowerForm } from '../FlowerForm';

type Props = {
  id: number;
  initialValues?: {
    name?: string;
    description?: string;
    rrules?: { [key in Actions]?: string };
    shelfId?: number;
  };
  onSubmit?: () => void;
  onClose?: () => void;
};

export const EditFlower = ({
  initialValues,
  onClose = () => {},
}: Props) => {
  const [showModal, setShowModal] = useState(false);

  const { isLoading, info, error } = useSelector(getShelf);
  const dispatch = useDispatch();

  const handleClose = () => {
    setShowModal(false);
    onClose();
  };

  let timer;
  const handleSubmit = (
    name: string,
    description: string,
    rrules: { [key in Actions]?: string },
  ) => {
    dispatch({
      type: SHELF_EDIT_FLOWER,
      payload: { ...initialValues, name, description, rrules },
    });
    timer = setTimeout(() => handleClose(), 2000);
  };
  useEffect(() => () => clearTimeout(timer), [timer]);

  return (
    <>
      <Button variant="outline-primary" onClick={() => setShowModal(true)}>
        Edit Flower
      </Button>
      <Modal
        show={showModal}
        onHide={handleClose}
        size="xl"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <BookmarkIcon />
            <span className="icon-prefix">
              Edit Flower
            </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FlowerForm
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
