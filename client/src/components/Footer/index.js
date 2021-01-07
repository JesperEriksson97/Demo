import React from 'react';
import { Row, Col, Jumbotron, Container } from 'reactstrap';

const Footer = () => (
  <>
    <Jumbotron className="footer">
      <Container>
        <Row>
          <Col md="3" sm="6">
            <h5>Kontakt</h5>
            <ul>
              <li>mail@mail.com</li>
              <li>012-12345</li>
              <li>Gården, 12345 Gårdstad</li>
            </ul>
          </Col>
          <Col md="3" sm="6">
            <h5>Villkor</h5>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dolor
              elit, iaculis sed ipsum sit amet, ultricies rutrum dui. Aenean
              aliquet tincidunt neque, eu malesuada lorem malesuada sed.
            </p>
          </Col>
          <Col md="3" sm="6">
            <h5>FAQ</h5>
            <ul>
              <li>Hur blir jag producent?</li>
              <li>Hur betalar jag?</li>
              <li>Vart hämtar jag mina varor?</li>
              <li>Vart hittar jag gurkan!?</li>
            </ul>
          </Col>
          <Col md="3" sm="6">
            <h5>Följ Oss</h5>
            <ul>
              <li>Facebook</li>
              <li>Twitter</li>
              <li>Instagram</li>
            </ul>
          </Col>
        </Row>
      </Container>
    </Jumbotron>
  </>
);
export default Footer;
