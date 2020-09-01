import React from 'react';
import { render } from '@testing-library/react';

describe('components/AddSocialToProfile', () => {
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

  const setUpMocks = ({ socialProfile }) => {
    jest.doMock('react-redux', () => ({
      useSelector: () => ({ socialProfile }),
    }));

    jest.doMock('./FbAuth', () => ({
      FbAuth: getGenericSocialAPI(),
    }));

    jest.doMock('./GoogleAuth', () => ({
      GoogleAuth: getGenericSocialAPI(),
    }));

    const { AddSocialToProfile } = require('./AddSocialToProfile');

    return render(<AddSocialToProfile />);
  };

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render add social profile buttons if no social profile has been added yet', () => {
    jest.isolateModules(() => {
      const { container } = setUpMocks({ socialProfile: null });

      expect(container.firstChild).toMatchSnapshot();
    });
  });

  it('should not render add social profile buttons if a social profile has been added', () => {
    jest.isolateModules(() => {
      const { container } = setUpMocks({
        socialProfile: { some: 'profile' },
      });

      expect(container.firstChild).toEqual(null);
    });
  });
});
