import React from 'react';
import { Nav, NavLink } from 'elements';

export const Header = () => (
  <header>
    <Nav>
      <Nav.Item>
        <NavLink to="/" exact>Home</NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink to="/signin">Sign In</NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink to="/signup">Sign Up</NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink to="/reset">Reset Password</NavLink>
      </Nav.Item>
    </Nav>
  </header>
);
