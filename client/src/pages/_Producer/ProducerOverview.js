import React from 'react';
import { useQuery } from '@apollo/client';
import {
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Table,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { ME_QUERY_ORGANISATION } from '../../graphql/user';
import Section from '../../components/Section';
import MetaData from '../../components/MetaData';

const ProducerOverview = ({ currentUser }) => {
  const organisationData = useQuery(ME_QUERY_ORGANISATION);
  const { error, loading, data } = organisationData;

  if (loading || !data) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  const { organisation } = data?.me;

  return (
    <>
      <MetaData title="Bonden.se | Hantera Organisation" description="" />
      <Section id="user-overview" className="section-light" fullWidth>
        <Container>
          <Row>
            <Col md="9">
              <h1>Mina sidor - Producent</h1>
              <hr />
              <h4 className="mb-3">Organisation</h4>
              <Row>
                <Col>
                  <h6>Min organisation</h6>
                  <p>
                    Namn: {organisation.name}
                    <br />
                    E-post: {currentUser.email}
                    <br />
                    Organisationsnr: {organisation.org_nr}
                  </p>
                </Col>
                <Col>
                  <h6>Utlämningsadress</h6>
                  {organisation.address?.length > 0 ? (
                    <p>
                      Gata: {organisation.address[0].street} <br />
                      Postnummer: {organisation.address[0].zip} <br />
                      Stad: {organisation.address[0].city}
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
                  tag={Link}
                  to="/producent/mina-sidor"
                  action
                >
                  Översikt
                </ListGroupItem>
                <ListGroupItem
                  tag={Link}
                  to={{
                    pathname: `/producent/mina-sidor/installningar`,
                    state: {
                      ...organisation,
                    },
                  }}
                  action
                >
                  Inställningar - Organisation
                </ListGroupItem>
                <ListGroupItem
                  tag={Link}
                  to={{
                    pathname: `/producent/mina-sidor/produkter`,
                    state: {
                      ...organisation,
                    },
                  }}
                  action
                >
                  Mina Produkter
                </ListGroupItem>
                <ListGroupItem tag={Link} to="/anvandare/mina-sidor" action>
                  Mina Sidor
                </ListGroupItem>
                <ListGroupItem tag={Link} to="/logga-ut" action>
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

export default ProducerOverview;
