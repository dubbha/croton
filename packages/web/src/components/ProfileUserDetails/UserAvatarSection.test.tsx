import React from 'react';
import { render } from '@testing-library/react';

describe('components/UserAvatarSection', () => {
  const firstName = 'Chuck';
  const lastName = 'Norris';
  const pictureUrl = 'https://my-pics/selfie-with-big-bang.png';
  const facebookId = '0';
  const mockSocialProfile = { pictureUrl, facebookId };

  const setUpMocks = ({ socialProfile }) => {
    const mockUseSelector = jest.fn().mockReturnValue({
      socialProfile,
      firstName,
      lastName,
    });

    jest.doMock('react-redux', () => ({
      useSelector: mockUseSelector,
    }));

    const { UserAvatarSection } = require('./UserAvatarSection');
    const { container, getByTestId } = render(<UserAvatarSection />);

    return {
      container,
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
        socialProfile: mockSocialProfile,
      });

      expect(container.firstChild).toMatchSnapshot();
    });
  });

  it('should pick up picture url from the social profile and set it up as a header', () => {
    jest.isolateModules(() => {
      const { getByTestId } = setUpMocks({
        socialProfile: mockSocialProfile,
      });

      const pictureContainer = getByTestId('userAvatarSection__picture');

      expect(pictureContainer.getElementsByTagName('source')[0]['src']).toBe(
        pictureUrl
      );
      expect(pictureContainer.getElementsByTagName('img')[0]['src']).toBe(
        pictureUrl
      );
    });
  });

  it('should pick up picture url from the social profile and set it up as a header', () => {
    jest.isolateModules(() => {
      const { getByTestId } = setUpMocks({
        socialProfile: undefined,
      });

      expect(getByTestId('userAvatarSection__default')).toBeTruthy();
    });
  });
});
