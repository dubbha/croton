import React from 'react';
import { render, fireEvent } from '@testing-library/react';

describe('components/FbAuth', () => {
  const facebookLoginBtnTestId = 'facebookLoginBtn';
  const getFbAuthAPI = response => ({
    appId,
    fields,
    scope,
    icon,
    callback,
    isDisabled,
    size,
    textButton,
  }) => (
    <div>
      <div>{appId}</div>
      <div>{fields}</div>
      <div>{scope}</div>
      <div>{icon}</div>
      <div>{size}</div>
      <button
        data-testid={facebookLoginBtnTestId}
        disabled={isDisabled}
        onClick={callback.bind(null, response)}
      >
        {textButton}
      </button>
    </div>
  );

  const setUpMocks = ({
    onResponseAction,
    onErrorAction,
    errorMessage,
    buttonText,
    response = { accessToken: '' },
    isLoading = false,
  }) => {
    const mockDispatch = jest.fn();
    jest.doMock('react-redux', () => ({
      useSelector: () => ({ isLoading }),
      useDispatch: () => mockDispatch,
    }));

    jest.doMock('react-facebook-login', () => getFbAuthAPI(response));

    const { FbAuth } = require('./FbAuth');
    const { container, getByTestId } = render(
      <FbAuth
        onResponseAction={onResponseAction}
        onErrorAction={onErrorAction}
        errorMessage={errorMessage}
        buttonText={buttonText}
      />,
    );
    return { container, mockDispatch, getByTestId };
  };

  afterEach(() => {
    jest.resetAllMocks();
  });

  const onResponseAction = 'NOICE_ALL_WENT_WELL';
  const onErrorAction = 'ALARM_SOME_PROBLEM_HAPPENED';
  const errorMessage = 'Chuck Norris has been defeated by Bruce Lee';
  const buttonText = 'Auth with Facebook';
  const accessToken = 'someTestToken123456789009876';
  const response = { accessToken };

  it('should render succesfully', () => {
    jest.isolateModules(() => {
      const { container } = setUpMocks({
        onResponseAction,
        onErrorAction,
        errorMessage,
        buttonText,
      });

      expect(container.firstChild).toMatchSnapshot();
    });
  });

  it('should disable the button while call to backend is pending', () => {
    jest.isolateModules(() => {
      const { getByTestId } = setUpMocks({
        onResponseAction,
        onErrorAction,
        errorMessage,
        buttonText,
        isLoading: true,
      });

      expect(getByTestId(facebookLoginBtnTestId)['disabled']).toBe(true);
    });
  });

  it('should report an error if no access token from backend is obtained', () => {
    jest.isolateModules(() => {
      const { getByTestId, mockDispatch } = setUpMocks({
        onResponseAction,
        onErrorAction,
        errorMessage,
        buttonText,
      });

      fireEvent.click(getByTestId(facebookLoginBtnTestId));

      expect(mockDispatch).toHaveBeenCalledWith({
        type: onErrorAction,
        payload: { error: errorMessage },
      });
    });
  });

  it('should pass access token once it is obtained from backend', () => {
    jest.isolateModules(() => {
      const { getByTestId, mockDispatch } = setUpMocks({
        onResponseAction,
        onErrorAction,
        errorMessage,
        buttonText,
        response,
      });

      fireEvent.click(getByTestId(facebookLoginBtnTestId));

      expect(mockDispatch).toHaveBeenCalledWith({
        type: onResponseAction,
        payload: { accessToken },
      });
    });
  });
});
