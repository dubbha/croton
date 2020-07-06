import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route } from 'react-router-dom';
import store, { history } from 'store';
import { Home, SignIn, SignUp, PasswordReset, Profile, SignOut, } from 'pages';
import './custom.scss';

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Route path="/signin" component={SignIn} />
      <Route path="/signout" component={SignOut} />
      <Route path="/profile" component={Profile} />
      <Route path="/signup" component={SignUp} />
      <Route path="/reset" component={PasswordReset} />
      <Route path="/" exact component={Home} />
    </ConnectedRouter>
  </Provider>
);

export default App;
