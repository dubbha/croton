import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import store from 'store';
import { Home, SignIn, SignUp, PasswordReset } from 'pages';
import './custom.scss';

const App = () => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/reset" component={PasswordReset} />
      </Switch>
    </Router>
  </Provider>
);

export default App;
