import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import store, { history, persistor } from 'store';
import {
  Home,
  SignIn,
  SignUp,
  PasswordReset,
  Profile,
  SignOut,
  EmailConfirm,
  EmailReset
} from 'pages';
import './custom.scss';

const App = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/signin" component={SignIn} />
          <Route path="/signout" component={SignOut} />
          <Route path="/profile" component={Profile} />
          <Route path="/signup" component={SignUp} />
          <Route path="/reset" component={PasswordReset} />
          <Route path="/confirm" component={EmailConfirm} />
          <Route path="/email-reset" component={EmailReset} />
          <Route path="/" component={Home} />
        </Switch>
      </ConnectedRouter>
    </PersistGate>
  </Provider>
);

export default App;
