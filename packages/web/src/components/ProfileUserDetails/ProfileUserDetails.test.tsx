import React from 'react';
import { render } from '@testing-library/react';

describe('components/ProfileUserDetails', () => {
  const setUpMocks = () => {
    jest.doMock('components', () => ({
      Container: () => <div data-testid="CONTAINER" />,
      UpdateProfileForm: () => (
        <form data-testid="UPDATE-PROFILE-FORM">
          <fieldset>
            <input type="text" />
            <input type="submit" />
          </fieldset>
        </form>
      ),
      AddSocialToProfile: () => (
        <button data-testid="WOOSH-WOOSH-AND-SOCIAL-PROFILE-IS-ADDED" />
      ),
    }));

    const { ProfileUserDetails } = require('./ProfileUserDetails');

    return render(<ProfileUserDetails />);
  };

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render successfully', () => {
    jest.isolateModules(() => {
      const { container } = setUpMocks();

      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
