import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'react-bootstrap';
import { Modal, Button, InfoAlert, ErrorAlert } from 'elements';
import { getAuth } from 'store/auth/selectors';
import { getShelf } from 'store/shelf/selectors';
import { AUTH_GET_INVITES } from 'store/auth';
import { SHELF_INVITE_ACCEPT } from 'store/shelf';

import './styles.scss';

export const ProfileInvites = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const { invites } = useSelector(getAuth);
  const { isLoading, info, error } = useSelector(getShelf);

  const handleOpen = () => {
    setShowModal(true);
  };

  useEffect(() => {
    dispatch({ type: AUTH_GET_INVITES });
  }, [dispatch, invites.length]);

  const reloadInvites = () => { dispatch({ type: AUTH_GET_INVITES }); };

  const handleClose = () => {
    reloadInvites();
    setShowModal(false);
  };

  const calculateHours = (expiresIn: string) => {
    const dateNow = new Date().getTime();
    const expireDate = new Date(+expiresIn).getTime();
    const timeDifference = Math.abs(expireDate - dateNow);

    return (timeDifference / 1000 / 3600).toFixed(0);
  };

  const acceptInvite = (shelfInvitationToken: string) => {
    dispatch({
      type: SHELF_INVITE_ACCEPT,
      payload: { shelfInvitationToken },
    });
    reloadInvites();
  };

  return (
    <>
      {!!invites.length && <Button variant="link" className="profile-link" onClick={() => handleOpen()}>Pending Invites ({invites.length})</Button>}
      <Modal show={showModal} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <span>My Invites</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mt-2 mb-2">
            {info && <InfoAlert>{info}</InfoAlert>}
            {error && <ErrorAlert>{error}</ErrorAlert>}
          </div>
          {invites.length
            ? (
              <Table striped>
                <thead>
                  <tr>
                    <th>Shelf Name</th>
                    <th>Shelf Location</th>
                    <th>Expires In</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {invites.map(({ id, shelf, expiresIn, shelfInvitationToken }) => (
                    <tr key={id}>
                      <td>{shelf.name}</td>
                      <td>{shelf.location}</td>
                      <td>{calculateHours(expiresIn)} hours</td>
                      <td>
                        <Button
                          disabled={isLoading}
                          variant="outline-success"
                          onClick={() => acceptInvite(shelfInvitationToken)}
                        >
                          Accept
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )
            : !info && (
              <div className="mt-2 mb-2">
                <InfoAlert>You do not have any invites yet.</InfoAlert>
              </div>
            )}
        </Modal.Body>
      </Modal>
    </>
  );
};
