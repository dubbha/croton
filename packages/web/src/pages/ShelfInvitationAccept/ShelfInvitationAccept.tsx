import { Container, Header, Footer } from 'components';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SHELF_INVITE_ACCEPT } from 'store/shelf';
import { getShelf } from 'store/shelf/selectors';
import { getQuery } from 'store/router/selectors';
import { AlertPlaceholder, ErrorAlert, InfoAlert } from 'elements';

export const ShelfInvitationAccept = () => {
  const dispatch = useDispatch();
  const { isLoading, info, error } = useSelector(getShelf);
  const { shelfInvitationToken } = useSelector(getQuery);

  useEffect(() => {
    if (shelfInvitationToken) {
      dispatch({
        type: SHELF_INVITE_ACCEPT,
        payload: { shelfInvitationToken },
      });
    }
  }, [dispatch, shelfInvitationToken]);

  return (
    <Container>
      <Header />
      {isLoading && <InfoAlert>Accepting the invitation</InfoAlert>}
      {info && <InfoAlert>{info}</InfoAlert>}
      {error && <ErrorAlert>{error}</ErrorAlert>}
      {!error && !info && !isLoading && <AlertPlaceholder />}
      <Footer />
    </Container>
  );
};
