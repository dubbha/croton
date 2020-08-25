import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Table, Tabs, Tab } from 'react-bootstrap';
import { Modal, Button } from 'elements';
import { SHELF_RESET } from 'store/shelf';
import { InviteUserToShelf } from '../InviteUserToShelf';

type Props = {
  shelfId: number;
}

export const UserManagement = ({ shelfId }: Props) => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const handleClose = () => {
    setShowModal(false);
    dispatch({ type: SHELF_RESET });
  }

  return (
    <>
      <Button
        variant="outline-primary"
        onClick={() => setShowModal(true)}
      >
        Users
      </Button>
      <Modal
        show={showModal}
        onHide={handleClose}
        size="lg"
        centered
      >
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
              {/* InviteUserToShelf Should be rework and moved here */}
              {/* <InviteUserToShelf shelfId={shelfId} /> */}
              <Table striped>
                <thead>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Actions</th>
                </thead>
                <tbody>
                  <td>Email@email.com</td>
                  <td>Pending</td>
                  <td>
                    <Button variant="danger">Remove invite</Button>
                  </td>
                </tbody>
              </Table>
            </Tab>
          </Tabs>
        </Modal.Body>
      </Modal>
    </>
  );
};
