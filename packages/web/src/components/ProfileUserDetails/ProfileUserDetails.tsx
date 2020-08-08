import React, {  useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container } from 'components';
import { Form, ErrorAlert, InfoAlert, AlertPlaceholder } from 'elements';
import { AUTH_RESET_EMAIL, AUTH_UPDATE_PROFILE } from 'store/auth/actions';
import { getAuth } from 'store/auth/selectors';
import './styles.scss';


export const ProfileUserDetails = () => {
  const dispatch = useDispatch();
  const {
    firstName,
    lastName,
    email,
    error,
    info,
  } = useSelector(getAuth);

  const initials = `${
    firstName && firstName[0] ? firstName[0].toUpperCase() : ''
  } ${lastName && lastName[0] ? lastName[0].toUpperCase() : ''}`;

  const [fName, setFName] = useState(firstName || '');
  const [lName, setLName] = useState(lastName || '');

  type Profile = { firstName: string | null; lastName: string | null };
  const profile: Profile = { firstName, lastName };

  const updateProfile = (partial: Partial<Profile>) =>
    dispatch({
      type: AUTH_UPDATE_PROFILE,
      payload: { ...profile, ...partial },
    });

  const changeFirstName = () =>
    fName !== firstName && fName.trim().length > 1
      ? updateProfile({ firstName: fName })
      : setFName(firstName || '');

  const changeLastName = () =>
    lName !== lastName && lName.trim().length > 1
      ? updateProfile({ lastName: lName })
      : setLName(lastName || '');

  const changeEmail = () => dispatch({ type: AUTH_RESET_EMAIL });

  return (
    <Container>

      <div className="circle">{initials}</div>
      <Form>
        {error && <ErrorAlert>{error}</ErrorAlert>}
        {info && <InfoAlert>{info}</InfoAlert>}
        {!error && !info && <AlertPlaceholder />}
        <Form.Group>
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="First Name"
            value={fName}
            onChange={(e) => setFName(e.target.value)}
            onBlur={changeFirstName}
          />
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Last Name"
            value={lName}
            onChange={(e) => setLName(e.target.value)}
            onBlur={changeLastName}
          />
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="button"
            placeholder="Email"
            value={email || ''}
            onClick={changeEmail}
          />
        </Form.Group>
      </Form>
      
    </Container>
  );
};
