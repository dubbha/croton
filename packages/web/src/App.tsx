import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import store, { history } from 'store';
import { Home, SignIn, SignUp, PasswordReset, Profile, SignOut, EmailConfirm } from 'pages';
import './custom.scss';

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/signin" component={SignIn} />
        <Route path="/signout" component={SignOut} />
        <Route path="/profile" component={Profile} />
        <Route path="/signup" component={SignUp} />
        <Route path="/reset" component={PasswordReset} />
        <Route path="/confirm" component={EmailConfirm} />
        <Route path="/" component={Home} />
      </Switch>
    </ConnectedRouter>
  </Provider>
);

export default App;
