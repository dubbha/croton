import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Nav } from 'elements';
import './styles.scss';

export const Footer = () => (
  <footer>
    <Container fluid>
      <Row>
        <Col>
          <div className="copyright">
            © {new Date().getFullYear()}{' '}
            <a href="https://github.com/dubbha/croton">Croton</a>
          </div>
        </Col>
        <Col>
          <Nav className="justify-content-end">
            <Nav.Item>
              <Nav.Link
                href="https://opensource.org/licenses/MIT"
                target="_blank"
              >
                MIT License
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="" target="_blank">
                Contact Us
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
      </Row>
    </Container>
  </footer>
);
