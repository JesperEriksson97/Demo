import React from 'react';
import {
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Table,
  Badge,
} from 'reactstrap';

import Section from '../../components/Section';
import MetaData from '../../components/MetaData';
import { USER, PRODUCER } from '../../config/constants';

const UserOverview = ({ currentUser }) => {
  const { username, email, firstname, lastname, role, address } = currentUser;

  return (
    <>
      <MetaData title="Bonden.se | Mina Sidor" description="" />
      <Section id="user-overview" className="section-light" fullWidth>
        <Container>
          <Row>
            <Col md="9">
              <h1>Mina sidor</h1>
              <hr />
              <h4 className="mb-3">Användare</h4>
              <Row>
                <Col md={6} sm={12}>
                  <h6>Om mig</h6>
                  <p>
                    Namn: {firstname} {lastname} <br />
                    Visningsnamn: {username} <br />
                    Email: {email}
                  </p>
                </Col>
                <Col md={6} sm={12}>
                  <h6>Address</h6>
                  {address ? (
                    <p>
                      Gata: {address.street} <br />
                      Postnummer/Stad: {address.zip} {address.city}
                    </p>
                  ) : (
                    <p>Ej angiven</p>
                  )}
                </Col>
              </Row>
              <h3>Transaktioner</h3>
              <Table hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Datum</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>Larry</td>
                    <td>the Bird</td>
                    <td>@twitter</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
            <Col md="3">
              <ListGroup>
                <ListGroupItem
                  active
                  tag="a"
                  href="/anvandare/mina-sidor"
                  action
                >
                  Översikt
                </ListGroupItem>
                <ListGroupItem
                  tag="a"
                  href="/anvandare/mina-sidor/installningar"
                  action
                >
                  Inställningar{' '}
                  {!currentUser?.address ? (
                    <Badge color="warning">1</Badge>
                  ) : null}
                </ListGroupItem>
                {role === USER && (
                  <ListGroupItem
                    tag="a"
                    href="/anvandare/mina-sidor/bli-producent"
                    action
                  >
                    Bli producent
                  </ListGroupItem>
                )}
                {role === PRODUCER && (
                  <ListGroupItem tag="a" href="/producent/mina-sidor" action>
                    Hantera Organisation
                  </ListGroupItem>
                )}
                <ListGroupItem tag="a" href="/logga-ut" action>
                  Logga ut
                </ListGroupItem>
              </ListGroup>
            </Col>
          </Row>
        </Container>
      </Section>
    </>
  );
};

export default UserOverview;
