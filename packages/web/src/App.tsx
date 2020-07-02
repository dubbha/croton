import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import store from 'store';
import { Home, SignIn } from 'pages';
import './custom.scss';

const App = () => (
  <Provider store={store}>
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/signin" component={SignIn} />
    </Router>
  </Provider>
);

export default App;
