import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { Route, Switch, RouteComponentProps } from 'react-router-dom';
import {
  Container,
  Header,
  Footer,
  ProfileHeader,
  ProfileUserDetails,
  Shelves,
  Shelf,
  AddNewShelfForm,
  Flower,
  AddFlowerForm,
} from 'components';
import { getAuth } from 'store/auth/selectors';
import './styles.scss';

export const Profile = ({ match: { path } }: RouteComponentProps) => {
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
        <Route path={`${path}/shelves`} component={Shelves} />
        <Route path={`${path}/shelf/:id`} component={Shelf} />
        <Route path={`${path}/add-shelf`} component={AddNewShelfForm} />
        <Route path={`${path}/flower/:id`} component={Flower} />
        <Route path={`${path}/add-flower`} component={AddFlowerForm} />
        <Route path={path} component={ProfileUserDetails} />
      </Switch>
      <Footer />
    </Container>
  );
};
