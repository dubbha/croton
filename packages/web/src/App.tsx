import React from 'react';
import { Provider } from 'react-redux';
import { Home, SignIn, SignUp, PasswordReset, Profile } from 'pages';
import { ConnectedRouter } from 'connected-react-router';
import { Route } from 'react-router-dom';
import store, { history } from 'store';
import './custom.scss';

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Route path="/signin" component={SignIn} />
      <Route path="/profile" component={Profile} />
      <Route path="/signup" component={SignUp} />
      <Route path="/reset" component={PasswordReset} />
      <Route path="/" exact component={Home} />
    </ConnectedRouter>
  </Provider>
);

export default App;
