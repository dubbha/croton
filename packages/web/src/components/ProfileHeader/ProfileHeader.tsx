import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Nav, NavLink } from 'elements';
import './styles.scss';
import { ProfileInvites } from '../ProfileInvites';

export const ProfileHeader = () => (
  <Navbar className="profile-nav">
    <Nav>
      <Nav.Item>
        <NavLink to="/profile" exact>Profile</NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink to="/profile/shelves">Shelves</NavLink>
      </Nav.Item>
      <Nav.Item>
        <ProfileInvites />
      </Nav.Item>
    </Nav>
  </Navbar>
);
