import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Nav, NavLink } from 'elements';
import './styles.scss';

export const ProfileHeader = () => {
  return (
    <Navbar className="profile-nav">
      <Nav>
        <Nav.Item>
          <NavLink to="/profile" exact>My Profile</NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink to="/profile/shelves-management">Create a New Shelf</NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink to="/profile/my-shelves">My Flower Shelves</NavLink>
        </Nav.Item>
      </Nav>
    </Navbar>
  );
};
