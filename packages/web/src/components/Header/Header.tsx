import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from 'react-bootstrap/Navbar';
import { Nav, NavLink, Link } from 'elements';
import { getAuth } from 'store/auth/selectors';
import './styles.scss';
import logo from './logo.svg';
import croton from './croton.png';

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
              width={60}
              height={60}
              className="d-inline-block align-top"
            />
            <img src={croton} alt="Croton. Care. Free." />
          </Navbar.Brand>
          <Nav.Item>
            <Link to="/#features">Features</Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/#about">About</Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/#services">Services</Link>
          </Nav.Item>
        </Nav>
        <Nav>
          {isAuthenticated ? (
            <>
              <Nav.Item>
                <NavLink to="/profile">{`${firstName} ${lastName}`.trim()}</NavLink>
              </Nav.Item>
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
