import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import {
  Container,
  Header,
  Footer,
  ProfileHeader,
  ProfileUserDetails,
} from 'components';
import { getAuth } from 'store/auth/selectors';
import './styles.scss';
import { MyFlowerShelves, FlowerShelvesManagement } from 'pages';

export const Profile = ({ match: { path } }) => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(getAuth);

  useEffect(() => {
    if (!isAuthenticated) dispatch(push('/signin'));
  }, [isAuthenticated, dispatch]);

  return (
    <Container>
      <Header />
      <ProfileHeader />
      <Switch>
        <Route
          path={`${path}/shelves-management`}
          component={FlowerShelvesManagement}
        />
        <Route path={`${path}/my-shelves`} component={MyFlowerShelves} />
        <Route path={path} component={ProfileUserDetails} />
      </Switch>
      <Footer />
    </Container>
  );
};
