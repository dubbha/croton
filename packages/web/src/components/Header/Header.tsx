import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from 'react-bootstrap/Navbar';
import { Nav, NavLink } from 'elements';
import { getAuth } from 'store/auth/selectors';
import './styles.scss';
import logo from './logo.svg';

export const Header = () => {
  const { isAuthenticated, firstName = '', lastName = '' } = useSelector(getAuth);

  return (
    <header>
      <Navbar expand="lg">
        <Nav className="mr-auto">
          <Navbar.Brand href="/">
            <img
              alt="logo"
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            <span className="companyName">Croton</span>
          </Navbar.Brand>
          <Nav.Item>
            <Nav.Link href="#features">Features</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#about">About</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#services">Services</Nav.Link>
          </Nav.Item>
        </Nav>
        <Nav>
          {isAuthenticated ? (
            <>
              <Nav.Item>{`${firstName} ${lastName}`.trim()}</Nav.Item>
              <NavLink to="/signout">Sign Out</NavLink>
            </>
          ) : (
            <>
              <Nav.Item>
                <NavLink to="/signin">Sign In</NavLink>
              </Nav.Item>
              <Nav.Item>
                <NavLink to="/signup">Sign Up</NavLink>
              </Nav.Item>
            </>
          )}
        </Nav>
      </Navbar>
    </header>
  );
};
