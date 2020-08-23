import React, { useState, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form, Button, SubmitButton, LoadingSpinner, InfoAlert, ErrorAlert, BookmarkIcon } from 'elements';
import { getShelf } from 'store/shelf/selectors';
import { SHELF_INVITE, SHELF_RESET } from 'store/shelf';
import { isEmail } from 'helpers/validators';
import './styles.scss';

type Props = {
  shelfId: number;
}

export const InviteUserToShelf = ({ shelfId }: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const { isLoading, info, error } = useSelector(getShelf);
  const dispatch = useDispatch();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch({
      type: SHELF_INVITE,
      payload: { shelfId, userEmail },
    });
  };

  const handleClose = () => {
    setShowModal(false);
    dispatch({ type: SHELF_RESET });
  };

  return (
    <>
      <Button variant="outline-primary" onClick={() => setShowModal(true)}>Invite User</Button>
      <Modal
        show={showModal}
        onHide={handleClose}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <BookmarkIcon />
            <span className="icon-prefix">Invite User to Shelf</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} className="invitation-form">
            <Form.Group controlId="formResetEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Please enter an email to send invitation to"
                value={userEmail}
                onChange={e => setUserEmail(e.target.value)}
                data-testid="emailResetForm__email"
              />
            </Form.Group>

            {error && <ErrorAlert>{error}</ErrorAlert>}
            {info && <InfoAlert>{info}</InfoAlert>}
            {!info && !error && (
              <SubmitButton disabled={isLoading || !isEmail(userEmail)}>
                <div className="spinner-container">
                  {isLoading && <LoadingSpinner />}
                </div>
                <span>Send Invitation</span>
              </SubmitButton>
            )}
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
