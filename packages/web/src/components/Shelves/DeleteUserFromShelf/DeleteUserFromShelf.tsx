import React, { useState, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, LoadingSpinner, InfoAlert, ErrorAlert } from 'elements';
import { getShelf } from 'store/shelf/selectors';
import { SHELF_DELETE_USER, SHELF_RESET } from 'store/shelf';

type Props = {
  shelfId: number,
  userId: number,
}

export const DeleteUserFromShelf = ({ shelfId, userId }: Props) => {
  const [showModal, setShowModal] = useState(false);

  const { isLoading, info, error } = useSelector(getShelf);
  const dispatch = useDispatch();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch({
      type: SHELF_DELETE_USER,
      payload: { shelfId, userId }
    });
  };

  const handleClose = () => {
    setShowModal(false);
    dispatch({ type: SHELF_RESET });
  }

  return (
    <>
      <button type="button" onClick={() => setShowModal(true)}>Delete user from shelf</button>
      <Modal
        show={showModal}
        onHide={handleClose}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Confirm
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete the user from the shelf?</p>
          {error && <ErrorAlert>{error}</ErrorAlert>}
          {info && <InfoAlert>{info}</InfoAlert>}
          {!info && !error && (
            <Button disabled={isLoading} onClick={handleSubmit}>
              <div className="spinner-container">
                {isLoading && <LoadingSpinner />}
              </div>
              <span>Delete user</span>
            </Button>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};
