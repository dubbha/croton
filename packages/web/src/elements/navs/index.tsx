import React from 'react';
import Nav from 'react-bootstrap/Nav';
import {
  NavLink as RouterNavLink,
  Link as RouterLink,
} from 'react-router-dom';

export { default as Nav } from 'react-bootstrap/Nav';

interface LinkProps {
  to: string | object;
  children?: React.ReactNode | React.ReactNode[];
}

export const Link = ({ to, children }: LinkProps) =>
  <Nav.Link as={RouterLink} to={to}>{children}</Nav.Link>

interface NavLinkProps extends LinkProps {
  exact?: boolean;
}

export const NavLink = ({ to, exact, children }: NavLinkProps) =>
  <Nav.Link as={RouterNavLink} to={to} exact={exact}>{children}</Nav.Link>

