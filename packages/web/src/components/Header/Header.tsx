import React from 'react';
import { Nav } from 'elements';

export const Header = () => (
  <header>
    <Nav>
      <Nav.Item>
        <Nav.Link href="/">Home</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/signin">Sign In</Nav.Link>
      </Nav.Item>
    </Nav>
  </header>
);
