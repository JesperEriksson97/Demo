/* eslint-disable camelcase */
import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import classnames from 'classnames';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import UpdateOrgForm from '../../forms/UpdateOrgForm';
import Section from '../../components/Section';
import UpdateAddressForm from '../../forms/UpdateAddressForm';
import MetaData from '../../components/MetaData';

const ProducerSettings = ({ currentUser }) => {
  const [activeTab, setActiveTab] = useState('1');
  const location = useLocation();

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <>
      <MetaData title="Bonden.se | Organisation inställningar" description="" />
      <Section id="user-settings" className="section-light" fullWidth>
        <Container>
          <Row>
            <Col md="9">
              <h1>Inställningar</h1>
              <hr />
              <Nav tabs>
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === '1' })}
                    onClick={() => {
                      toggle('1');
                    }}
                  >
                    Organisation
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === '2' })}
                    onClick={() => {
                      toggle('2');
                    }}
                  >
                    Utlämningsadress
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                  <Row>
                    <Col sm="12">
                      <UpdateOrgForm
                        organisation={location.state}
                        user={currentUser}
                      />
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId="2">
                  <Row>
                    <Col sm="12">
                      <UpdateAddressForm address={location.state.address[0]} />
                    </Col>
                  </Row>
                </TabPane>
              </TabContent>
            </Col>
            <Col md="3">
              <ListGroup>
                <ListGroupItem tag={Link} to="/producent/mina-sidor" action>
                  Översikt
                </ListGroupItem>
                <ListGroupItem
                  tag={Link}
                  to={{
                    pathname: '/producent/mina-sidor/installningar',
                    state: {
                      ...location.state,
                    },
                  }}
                  action
                  active
                >
                  Inställningar - Organisation
                </ListGroupItem>
                <ListGroupItem
                  tag={Link}
                  to={{
                    pathname: `/producent/mina-sidor/produkter`,
                    state: {
                      ...location.state,
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

export default ProducerSettings;
