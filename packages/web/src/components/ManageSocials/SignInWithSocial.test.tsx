import React from 'react';
import { render } from '@testing-library/react';

describe('components/SignInWithSocial', () => {
  const getGenericSocialAPI = () => ({
    onResponseAction,
    onErrorAction,
    errorMessage,
    buttonText,
  }) => (
    <div data-testid="genericSocialApi">
      <div>{onResponseAction}</div>
      <div>{onErrorAction}</div>
      <div>{errorMessage}</div>
      <div>{buttonText}</div>
    </div>
  );

  const setUpMocks = () => {
    jest.doMock('./FbAuth', () => ({
      FbAuth: getGenericSocialAPI(),
    }));

    jest.doMock('./GoogleAuth', () => ({
      GoogleAuth: getGenericSocialAPI(),
    }));

    const { SignInWithSocial } = require('./SignInWithSocial');

    return render(<SignInWithSocial />);
  };

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render succesfully', () => {
    jest.isolateModules(() => {
      const { container } = setUpMocks();

      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
