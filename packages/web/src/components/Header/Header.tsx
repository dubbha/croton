import React from 'react';
import { useSelector } from 'react-redux';
import { Nav, NavLink } from 'elements';
import { getAuth } from 'store/auth/selectors';
import './styles.scss';

export const Header = () => {
  const { token } = useSelector(getAuth);

  return (
    <header>
      <Nav>
        <Nav.Item>
          <NavLink to="/" exact>
            Home
          </NavLink>
        </Nav.Item>
        {token ? (
          <NavLink to="/signout">Sign Out</NavLink>
        ) : (
          <>
            <Nav.Item>
              <NavLink to="/signin">Sign In</NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink to="/signup">Sign Up</NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink to="/reset">Reset Password</NavLink>
            </Nav.Item>
          </>
        )}
      </Nav>
    </header>
  );
};
