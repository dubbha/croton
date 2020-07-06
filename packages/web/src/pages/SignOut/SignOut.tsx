import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { AUTH_LOGOUT } from 'store/auth/actions';

export const SignOut = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: AUTH_LOGOUT });
    dispatch(push('/'));
  }, [dispatch]);

  return null;
};
