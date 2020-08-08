import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { Container, Header, Footer, ProfileHeader, ProfileUserDetails } from 'components';
import { getAuth } from 'store/auth/selectors';
import './styles.scss';
import { MyFlowerShelfs, FlowerShelfsManagement } from 'pages';

export const Profile = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(getAuth);

  useEffect(() => {
    if (!isAuthenticated) dispatch(push('/signin'));
  }, [isAuthenticated, dispatch]);

  return (
    <Container>
      <Header />
      <ProfileHeader />
      <Router>
        <Switch>
          <Route exact path="/profile">
            <Redirect push to="/profile/me" />
          </Route>
          <Route
            path="/profile/shelfs-management"
            component={FlowerShelfsManagement}
          />
          <Route path="/profile/my-shelfs" component={MyFlowerShelfs} />
          <Route path="/profile/me" component={ProfileUserDetails} />
        </Switch>
      </Router>
      <Footer />
    </Container>
  );
};
