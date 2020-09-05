import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Tabs, Tab } from 'react-bootstrap';
import { Modal, Button, InfoAlert, LoadingSpinner, ErrorAlert } from 'elements';
import { getShelf } from 'store/shelf/selectors';
import { SHELF_GET_INVITES, SHELF_INVITE_REVOKE, SHELF_RESET } from 'store/shelf';
import { InviteUserToShelf } from '../InviteUserToShelf';

type Props = {
  shelfId: number;
};

export const UserManagement = ({ shelfId }: Props) => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const { invites, isLoading, info, error } = useSelector(getShelf);

  const handleOpen = () => {
    dispatch({ type: SHELF_GET_INVITES, payload: { shelfId } });
    setShowModal(true);
  };

  const refreshInvites = () => dispatch({ type: SHELF_GET_INVITES, payload: { shelfId } });

  const handleClose = () => {
    setShowModal(false);
    dispatch({ type: SHELF_RESET });
  };

  const revokeInvite = (id) => {
    dispatch({ type: SHELF_INVITE_REVOKE, payload: { shelfId, inviteId: id } });
    refreshInvites();
  };

  const calculateHours = (expiresIn) => {
    const dateNow = new Date().getTime();
    const expireDate = new Date(+expiresIn).getTime();
    const timeDifference = Math.abs(expireDate - dateNow);

    return (timeDifference / 1000 / 3600).toFixed(0);
  };

  return (
    <>
      <Button variant="outline-primary" onClick={() => handleOpen()}>
        Users
      </Button>
      <Modal show={showModal} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <span>Users</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tabs defaultActiveKey="invitations" id="uncontrolled-tab-example">
            <Tab eventKey="invitations" title="Invitations">
              <div className="spinner-container">
                {isLoading && <LoadingSpinner />}
              </div>
              <div className="mt-2 mb-2">
                {info && <InfoAlert>{info}</InfoAlert>}
                {error && <ErrorAlert>{error}</ErrorAlert>}
              </div>
              <InviteUserToShelf shelfId={shelfId} onClose={refreshInvites} />
              {invites.length ? (
                <Table striped>
                  <thead>
                    <tr>
                      <th>Email</th>
                      <th>Expires In</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invites.map(({ id, userEmail, expiresIn }) => (
                      <tr>
                        <td>{userEmail}</td>
                        <td>{calculateHours(expiresIn)} hours</td>
                        <td>
                          <Button
                            disabled={isLoading}
                            variant="danger"
                            onClick={() => revokeInvite(id)}
                          >
                            Revoke invite
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : <div className="mt-2 mb-2"><InfoAlert>You do not have any invites yet.</InfoAlert></div>}
            </Tab>
            <Tab eventKey="users" title="Users" disabled>
              <Table striped>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Name</td>
                    <td>email@email.com</td>
                    <td>
                      <Button variant="danger">Remove</Button>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Tab>
          </Tabs>
        </Modal.Body>
      </Modal>
    </>
  );
};
