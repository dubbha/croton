import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Tabs, Tab } from 'react-bootstrap';
import {Modal, Button, Alert, InfoAlert} from 'elements';
import { getShelf } from 'store/shelf/selectors';
import {SHELF_GET_FLOWERS, SHELF_GET_INVITES, SHELF_RESET} from 'store/shelf';
import { InviteUserToShelf } from '../InviteUserToShelf';
import {AddFlower} from "../AddFlower";

type Props = {
  shelfId: number;
};

export const UserManagement = ({ shelfId }: Props) => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const { invites } = useSelector(getShelf);

  useEffect(() => {
    dispatch({ type: SHELF_GET_INVITES, payload: { shelfId } });
  }, [dispatch, shelfId]);

  const refreshInvites = () => dispatch({ type: SHELF_GET_INVITES, payload: { shelfId } });

  const handleClose = () => {
    setShowModal(false);
    dispatch({ type: SHELF_RESET });
  };

  return (
    <>
      <Button variant="outline-primary" onClick={() => setShowModal(true)}>
        Users
      </Button>
      <Modal show={showModal} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <span>Users</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tabs defaultActiveKey="users" id="uncontrolled-tab-example">
            <Tab eventKey="users" title="Users">
              <Table striped>
                <thead>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Actions</th>
                </thead>
                <tbody>
                  <td>Name</td>
                  <td>email@email.com</td>
                  <td>
                    <Button variant="danger">Remove</Button>
                  </td>
                </tbody>
              </Table>
            </Tab>
            <Tab eventKey="invitations" title="Invitations">
              <InviteUserToShelf shelfId={shelfId} onClose={refreshInvites} />
              {invites.length ? (
                <Table striped>
                  <thead>
                    <th>Email</th>
                    <th>Expires In</th>
                    <th>Actions</th>
                  </thead>
                  <tbody>
                    {invites.map(({ userEmail, expiresIn}) => (
                      <tr>
                        <td>{userEmail}</td>
                        <td>{new Date(+expiresIn).getHours()} hours</td>
                        <td>
                          <Button variant="danger">Remove invite</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : <div className="mt-2 mb-2"><InfoAlert>You do not have any invites yet</InfoAlert></div>}
            </Tab>
          </Tabs>
        </Modal.Body>
      </Modal>
    </>
  );
};
