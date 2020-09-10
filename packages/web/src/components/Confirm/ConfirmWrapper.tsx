import React, { useState, FormEvent } from 'react';
import { Modal, Button } from 'elements';
import './styles.scss';

type Props = {
  children: React.ReactNode | React.ReactNode[];
  text?: string;
  question?: string;
  onConfirm: () => void;
  onCancel?: () => void;
}

export const ConfirmWrapper = ({
  children,
  question = 'Are you sure?',
  onConfirm,
  onCancel = () => {},
}: Props) => {
  const [showModal, setShowModal] = useState(false);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setShowModal(false);
    onConfirm();
  };

  const handleClose = () => {
    setShowModal(false);
    onCancel();
  };

  const showModalOnEnter = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setShowModal(true);
    }
  };

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        onClick={() => setShowModal(true)}
        onKeyPress={showModalOnEnter}
        className="confirm-wrapper-icon"
      >
        {children}
      </div>
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
