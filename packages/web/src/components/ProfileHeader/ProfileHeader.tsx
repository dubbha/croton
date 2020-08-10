import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Nav, NavLink } from 'elements';
import './styles.scss';

export const ProfileHeader = () => {
  return (
    <Navbar className="profile-nav">
      <Nav>
        <Nav.Item>
          <NavLink to="/profile" exact>Profile</NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink to="/profile/shelves">Shelves</NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink to="/profile/shelf/key0">Mock Shelf</NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink to="/profile/add-shelf">Create Shelf</NavLink>
        </Nav.Item>
      </Nav>
    </Navbar>
  );
};
