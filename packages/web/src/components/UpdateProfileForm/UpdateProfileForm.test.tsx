import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { AUTH_RESET_EMAIL, AUTH_UPDATE_PROFILE } from 'store/auth/actions';

describe('components/UpdateProfileForm', () => {
  const firstName = 'Chuck';
  const lastName = 'Norris';
  const email = 'bigbangkickedbyleg@hero.com';
  const error = 'Has been defeated by Bruce Lee';
  const info = 'Chuck Norris admits to having trained with Bruce Lee for approximately two years';

  const setUpMocks = ({ isSignedInWithSocial, info, error }) => {
    const mockDispatch = jest.fn();
    const mockUseSelector = jest.fn().mockReturnValue({
      isSignedInWithSocial,
      info,
      error,
      firstName,
      lastName,
      email,
    });

    const TEST_INFO_DISPLAY_TIME_MS = 0;

    jest.doMock('react-redux', () => ({
      useDispatch: () => mockDispatch,
      useSelector: mockUseSelector,
    }));

    jest.doMock('./constants', () => ({
      INFO_DISPLAY_TIME_MS: TEST_INFO_DISPLAY_TIME_MS,
    }));

    const { UpdateProfileForm } = require('./UpdateProfileForm');
    const { container, getByTestId } = render(<UpdateProfileForm />);

    return {
      container,
      mockDispatch,
      mockUseSelector,
      getByTestId,
    };
  };

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render successfully', () => {
    jest.isolateModules(() => {
      const { container } = setUpMocks({
        isSignedInWithSocial: false,
        info: null,
        error: null,
      });

      expect(container.firstChild).toMatchSnapshot();
    });
  });

  it('should keep a placeholder for info or error', () => {
    jest.isolateModules(() => {
      const { getByTestId, container } = setUpMocks({
        isSignedInWithSocial: false,
        info: null,
        error: null,
      });

      expect(container).toContainElement(getByTestId('alertPlaceholder'));
    });
  });

  it('should display info if it is provided from auth', () => {
    jest.isolateModules(() => {
      const { container, getByTestId } = setUpMocks({
        isSignedInWithSocial: false,
        info,
        error: null,
      });

      expect(container.firstChild).toMatchSnapshot();
      expect(getByTestId('infoAlert').textContent).toBe(info);
    });
  });

  it('should display auth error', () => {
    jest.isolateModules(() => {
      const { container, getByTestId } = setUpMocks({
        isSignedInWithSocial: false,
        info: null,
        error,
      });

      expect(container.firstChild).toMatchSnapshot();
      expect(getByTestId('errorAlert').textContent).toBe(error);
    });
  });

  it('should pass first name, last name and email to the correspondent fields', () => {
    jest.isolateModules(() => {
      const { getByTestId } = setUpMocks({
        isSignedInWithSocial: false,
        info: null,
        error: null,
      });
      const testValues = [
        { dataTestId: 'updateProfileForm__firstName', value: firstName },
        { dataTestId: 'updateProfileForm__lastName', value: lastName },
        { dataTestId: 'updateProfileForm__changeEmail', value: email },
      ];

      testValues.forEach(({ dataTestId, value }) => {
        expect(getByTestId(dataTestId).getAttribute('value')).toBe(value);
      });
    });
  });

  it('should render first and last name fields as text inputs if a user is signed in via email', () => {
    jest.isolateModules(() => {
      const { getByTestId } = setUpMocks({
        isSignedInWithSocial: false,
        info: null,
        error: null,
      });
      const testValues = [
        'updateProfileForm__firstName',
        'updateProfileForm__lastName',
      ];

      testValues.forEach(dataTestId => {
        expect(getByTestId(dataTestId).getAttribute('type')).toBe('text');
      });
    });
  });

  it('should render the email field as enabled button is signed in via email', () => {
    jest.isolateModules(() => {
      const { getByTestId } = setUpMocks({
        isSignedInWithSocial: false,
        info: null,
        error: null,
      });

      expect(getByTestId('updateProfileForm__changeEmail')['disabled']).toBe(
        false,
      );
    });
  });

  it('should render first and last name fields as button inputs if a user is signed in via social', () => {
    jest.isolateModules(() => {
      const testValues = [
        'updateProfileForm__firstName',
        'updateProfileForm__lastName',
      ];
      const { getByTestId } = setUpMocks({
        isSignedInWithSocial: true,
        info: null,
        error: null,
      });

      testValues.forEach(dataTestId => {
        expect(getByTestId(dataTestId).getAttribute('type')).toBe('button');
      });
    });
  });

  it('should make the input fields disabled if a user is signed in via social', () => {
    jest.isolateModules(() => {
      const { getByTestId } = setUpMocks({
        isSignedInWithSocial: true,
        info: null,
        error: null,
      });
      const testValues = [
        'updateProfileForm__firstName',
        'updateProfileForm__lastName',
        'updateProfileForm__changeEmail',
      ];

      testValues.forEach(dataTestId => {
        expect(getByTestId(dataTestId)['disabled']).toBe(true);
      });
    });
  });

  it('should trigger reset email process after having clicked at the change email', () => {
    jest.isolateModules(() => {
      const { mockDispatch, getByTestId } = setUpMocks({
        isSignedInWithSocial: false,
        info: null,
        error: null,
      });

      fireEvent.click(getByTestId('updateProfileForm__changeEmail'));
      expect(mockDispatch).toHaveBeenCalledWith({ type: AUTH_RESET_EMAIL });
    });
  });

  it('should update the profile first name if it has been changed', () => {
    jest.isolateModules(() => {
      const { mockDispatch, getByTestId } = setUpMocks({
        isSignedInWithSocial: false,
        info: null,
        error: null,
      });

      const newFirstName = 'Clark';
      const firstNameField = getByTestId('updateProfileForm__firstName');

      fireEvent.change(firstNameField, {
        target: { value: newFirstName },
      });
      fireEvent.blur(firstNameField);

      expect(mockDispatch).toHaveBeenCalledWith({
        type: AUTH_UPDATE_PROFILE,
        payload: { firstName: newFirstName, lastName },
      });
    });
  });

  it('should not update the profile first name if the same value has been input by a user', () => {
    jest.isolateModules(() => {
      const { mockDispatch, getByTestId } = setUpMocks({
        isSignedInWithSocial: false,
        info: null,
        error: null,
      });

      const firstNameField = getByTestId('updateProfileForm__firstName');

      fireEvent.change(firstNameField, {
        target: { value: firstName },
      });
      fireEvent.blur(firstNameField);

      expect(mockDispatch).toHaveBeenCalledTimes(0);
    });
  });

  it('should update the profile last name if it has been changed', () => {
    jest.isolateModules(() => {
      const { mockDispatch, getByTestId } = setUpMocks({
        isSignedInWithSocial: false,
        info: null,
        error: null,
      });

      const newLastName = 'Kent';
      const lastNameField = getByTestId('updateProfileForm__lastName');

      fireEvent.change(lastNameField, {
        target: { value: newLastName },
      });
      fireEvent.blur(lastNameField);

      expect(mockDispatch).toHaveBeenCalledWith({
        type: AUTH_UPDATE_PROFILE,
        payload: { firstName, lastName: newLastName },
      });
    });
  });

  it('should not update the profile last name if the same value has been input by a user', () => {
    jest.isolateModules(() => {
      const { mockDispatch, getByTestId } = setUpMocks({
        isSignedInWithSocial: false,
        info: null,
        error: null,
      });

      const lastNameField = getByTestId('updateProfileForm__lastName');

      fireEvent.change(lastNameField, {
        target: { value: lastName },
      });
      fireEvent.blur(lastNameField);

      expect(mockDispatch).toHaveBeenCalledTimes(0);
    });
  });
});
