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
  Badge,
} from 'reactstrap';
import classnames from 'classnames';
import { USER, PRODUCER } from '../../config/constants';

import Section from '../../components/Section';
import CreateAddressForm from '../../forms/CreateAddressForm';
import UpdateUserForm from '../../forms/UpdateUserForm';
import UpdateAddressForm from '../../forms/UpdateAddressForm';
import UpdatePasswordForm from '../../forms/UpdatePasswordForm';
import MetaData from '../../components/MetaData';

const UserSettings = ({ currentUser }) => {
  const [activeTab, setActiveTab] = useState('1');

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <>
      <MetaData title="Bonden.se | Mina inställningar" description="" />
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
                    Användare
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === '2' })}
                    onClick={() => {
                      toggle('2');
                    }}
                  >
                    Adress{' '}
                    {!currentUser?.address ? (
                      <Badge color="warning">1</Badge>
                    ) : null}
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === '3' })}
                    onClick={() => {
                      toggle('3');
                    }}
                  >
                    Ändra lösenord
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                  <Row>
                    <Col sm="12">
                      <UpdateUserForm user={currentUser} />
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId="2">
                  <Row>
                    <Col sm="12">
                      {!currentUser?.address ? (
                        <CreateAddressForm />
                      ) : (
                        <UpdateAddressForm address={currentUser?.address} />
                      )}
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId="3">
                  <Row>
                    <Col sm="12">
                      <UpdatePasswordForm />
                    </Col>
                  </Row>
                </TabPane>
              </TabContent>
            </Col>
            <Col md="3">
              <ListGroup>
                <ListGroupItem tag="a" href="/anvandare/mina-sidor" action>
                  Översikt
                </ListGroupItem>
                <ListGroupItem
                  active
                  tag="a"
                  href="/anvandare/mina-sidor/installningar"
                  action
                >
                  Inställningar{' '}
                  {!currentUser?.address ? (
                    <Badge color="warning">1</Badge>
                  ) : null}
                </ListGroupItem>
                {currentUser.role === USER && (
                  <ListGroupItem
                    tag="a"
                    href="/anvandare/mina-sidor/bli-producent"
                    action
                  >
                    Bli producent
                  </ListGroupItem>
                )}
                {currentUser.role === PRODUCER && (
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

export default UserSettings;
