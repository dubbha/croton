import React, { useState, FormEvent } from 'react';
import { Modal, Button } from 'elements';

type Props = {
  text: string;
  question?: string;
  onConfirm: () => void;
  onCancel?: () => void;
}

export const Confirm = ({
  text,
  question = 'Are you sure?',
  onConfirm,
  onCancel = () => {},
}: Props) => {
  const [showModal, setShowModal] = useState(false);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onConfirm();
  };

  const handleClose = () => {
    setShowModal(false);
    onCancel();
  }

  return (
    <>
      <Button variant="outline-primary" onClick={() => setShowModal(true)}>{text}</Button>
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
          <p>{question}</p>
          <Button onClick={handleSubmit}>
            <span>Confirm</span>
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
};
