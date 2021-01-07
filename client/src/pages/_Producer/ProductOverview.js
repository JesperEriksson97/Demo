import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import {
  Row,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from 'reactstrap';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { ME_QUERY_PRODUCTS } from '../../graphql/user';
import ProductItem from '../../components/ProductItem';
import ProductForm from '../../forms/ProductForms';
import Section from '../../components/Section';
import MetaData from '../../components/MetaData';

const ProductOverview = () => {
  const [activeTab, setActiveTab] = useState('1');
  const productData = useQuery(ME_QUERY_PRODUCTS);
  const location = useLocation();
  const { name, address } = location.state;

  const { error, loading, data } = productData;

  if (loading || !data) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  const { products } = data?.me.organisation;

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <>
      <MetaData title="Bonden.se | Mina Produkter" description="" />
      <Section className="section-light" fullWidth>
        <Container>
          <Row>
            <Col md={9}>
              <h1 className="mb-4">Mina Produkter</h1>
              <div className="mb-4">
                <Nav tabs>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === '1' })}
                      onClick={() => {
                        toggle('1');
                      }}
                    >
                      Aktiva produkter
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === '2' })}
                      onClick={() => {
                        toggle('2');
                      }}
                    >
                      Lägg till produkt
                    </NavLink>
                  </NavItem>
                </Nav>
              </div>
              <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                  <Row className="active-products">
                    {products.length > 0 ? (
                      products.map((product, index) => (
                        <ProductItem
                          key={index}
                          product={product}
                          address={address}
                          name={name}
                        />
                      ))
                    ) : (
                      <h6 className="mt-4 ml-3">Inga aktiva produkter</h6>
                    )}
                  </Row>
                </TabPane>
                <TabPane tabId="2">
                  <Row>
                    <Col sm={12}>
                      <ProductForm />
                    </Col>
                  </Row>
                </TabPane>
              </TabContent>
            </Col>
            <Col md={3}>
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
                  active
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
export default ProductOverview;
