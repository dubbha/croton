import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, ErrorAlert, InfoAlert, AlertPlaceholder } from 'elements';
import { AUTH_RESET_EMAIL, AUTH_UPDATE_PROFILE } from 'store/auth/actions';
import { getAuth } from 'store/auth/selectors';
import { INFO_DISPLAY_TIME_MS } from './constants';

type Profile = { firstName: string | null; lastName: string | null };

export const UpdateProfileForm = () => {
  const dispatch = useDispatch();
  const {
    firstName,
    lastName,
    email,
    error,
    info,
    isSignedInWithSocial,
  } = useSelector(getAuth);

  const [fName, setFName] = useState(firstName || '');
  const [lName, setLName] = useState(lastName || '');
  const [displayedInfo, setDisplayedInfo] = useState(info || '');

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

  const nameFieldsType = isSignedInWithSocial ? 'button' : 'text';

  React.useEffect(() => {
    setDisplayedInfo(info || '');

    const timer = setTimeout(() => {
      setDisplayedInfo('');
    }, INFO_DISPLAY_TIME_MS);

    return () => clearTimeout(timer);
  }, [info]);

  return (
    <Form>
      {error && <ErrorAlert>{error}</ErrorAlert>}
      {displayedInfo && <InfoAlert>{displayedInfo}</InfoAlert>}
      {!error && !displayedInfo && <AlertPlaceholder />}
      <Form.Group>
        <Form.Label>First Name</Form.Label>
        <Form.Control
          type={nameFieldsType}
          placeholder="First Name"
          value={fName}
          onChange={e => setFName(e.target.value)}
          onBlur={changeFirstName}
          disabled={isSignedInWithSocial}
          data-testid="updateProfileForm__firstName"
          title={isSignedInWithSocial ? undefined : 'Update my first name'}
        />
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          type={nameFieldsType}
          placeholder="Last Name"
          value={lName}
          onChange={e => setLName(e.target.value)}
          onBlur={changeLastName}
          disabled={isSignedInWithSocial}
          data-testid="updateProfileForm__lastName"
          title={isSignedInWithSocial ? undefined : 'Update my last name'}
        />
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="button"
          placeholder="Email"
          value={email || ''}
          onClick={changeEmail}
          disabled={isSignedInWithSocial}
          data-testid="updateProfileForm__changeEmail"
          title={isSignedInWithSocial ? undefined : 'Update my email'}
        />
      </Form.Group>
    </Form>
  );
};
