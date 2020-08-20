import React from 'react';
import { render, fireEvent } from '@testing-library/react';

describe('components/GoogleAuth', () => {
  const successGoogleLoginBtnTestId = 'successGoogleLoginBtn';
  const failureGoogleLoginBtnTestId = 'failureGoogleLoginBtn';
  const accessToken = 'someTestToken123456789009876';
  const response = { accessToken };

  const getGoogleAuthAPI = () => ({
    clientId,
    buttonText,
    onSuccess,
    onFailure,
    className,
    disabled,
  }) => (
    <div>
      <div>{clientId}</div>
      <div>{className}</div>
      <button
        data-testid={successGoogleLoginBtnTestId}
        disabled={disabled}
        onClick={onSuccess.bind(null, response)}
      >
        {buttonText}
      </button>
      <button
        data-testid={failureGoogleLoginBtnTestId}
        disabled={disabled}
        onClick={onFailure}
      >
        {buttonText}
      </button>
    </div>
  );

  const setUpMocks = ({
    onResponseAction,
    onErrorAction,
    errorMessage,
    buttonText,
    isLoading = false,
  }) => {
    const mockDispatch = jest.fn();
    jest.doMock('react-redux', () => ({
      useSelector: () => ({ isLoading }),
      useDispatch: () => mockDispatch,
    }));

    jest.doMock('react-google-login', getGoogleAuthAPI);

    const { GoogleAuth } = require('./GoogleAuth');
    const { container, getByTestId } = render(
      <GoogleAuth
        onResponseAction={onResponseAction}
        onErrorAction={onErrorAction}
        errorMessage={errorMessage}
        buttonText={buttonText}
      />
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

  it('should render succesfully', () => {
    jest.isolateModules(() => {
      const { container } = setUpMocks({
        onResponseAction,
        onErrorAction,
        errorMessage,
        buttonText,
        isLoading: false,
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

      expect(getByTestId(successGoogleLoginBtnTestId)['disabled']).toBe(true);
      expect(getByTestId(failureGoogleLoginBtnTestId)['disabled']).toBe(true);
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

      fireEvent.click(getByTestId(failureGoogleLoginBtnTestId));

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
      });

      fireEvent.click(getByTestId(successGoogleLoginBtnTestId));

      expect(mockDispatch).toHaveBeenCalledWith({
        type: onResponseAction,
        payload: { accessToken },
      });
    });
  });
});
