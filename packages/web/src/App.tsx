import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Header, User, Home } from 'components';
import store from 'store';
import logo from './logo.svg';
import './App.scss';

const App = () => (
  <Provider store={store}>
    <div className="App">
      <Header />
      <Router>
        <Route path="/" exact component={Home} />
        <Route path="/user" component={User} />
      </Router>
      <img src={logo} className="App-logo" alt="logo" />
      <div>Styled <code>src/App.tsx</code> block</div>
    </div>
  </Provider>
);

export default App;
