import React from 'react';
import { Container, Row, Col, Nav, NavItem, NavLink } from 'reactstrap';
import Section from '../../components/Section';
import AddProductForm from '../../forms/ProductForms/AddProductForm';
import MetaData from '../../components/MetaData';

const AddProduct = () => (
  <>
    <MetaData title="Bonden.se | Skapa ny Produkt" description="" />
    <Section className="section-light" fullWidth>
      <Container>
        <Row>
          <Col md="9">
            <h1 className="mb-4">Skapa ny Produkt</h1>
            <div>
              <Nav tabs>
                <NavItem>
                  <NavLink href="/producent/mina-produkter">
                    Aktiva produkter
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink active href="/producent/skapa-produkt">
                    Lägg till produkt
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="#">Inaktiva produkter</NavLink>
                </NavItem>
              </Nav>
            </div>
            <hr />
          </Col>
        </Row>
        <AddProductForm />
      </Container>
    </Section>
  </>
);

export default AddProduct;
