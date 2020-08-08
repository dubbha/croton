import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Nav, NavLink } from 'elements';
import './styles.scss';

export const ProfileHeader = () => {
  return (
    <Navbar className="profile-nav">
      <Nav>
        <Nav.Item>
          <NavLink to="./me">My Profile</NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink to="./shelfs-management">Create a New Shelfs</NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink to="./my-shelfs">My Flower Shelfs</NavLink>
        </Nav.Item>
      </Nav>
    </Navbar>
  );
};
