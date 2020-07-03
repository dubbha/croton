import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { NavLink as RouterNavLink } from 'react-router-dom';

export { default as Nav } from 'react-bootstrap/Nav';

type Props = {
  to: string;
  exact?: boolean;
  children?: React.ReactNode | React.ReactNode[];
}
export const NavLink = ({ to, exact, children }: Props) =>
  <Nav.Link as={RouterNavLink} to={to} exact={exact}>{children}</Nav.Link>