import React from 'react';
import { Container, Header, Footer } from 'components';
import logo from './logo.svg';

export const Home = () => (
  <Container>
    <Header />
    <img src={logo} className="logo" alt="logo" />
    <div>
      Styled <code>code</code> block
    </div>
    <Footer />
  </Container>
);
