import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route } from 'react-router-dom';
import store, { history } from 'store';
import { Home, SignIn, Profile } from 'pages';
import './custom.scss';

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Route path="/" exact component={Home} />
      <Route path="/signin" component={SignIn} />
      <Route path="/profile" component={Profile} />
    </ConnectedRouter>
  </Provider>
);

export default App;
