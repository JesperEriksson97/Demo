import React from 'react';
import { Container, Row, Col, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import Section from '../../components/Section';
import BecomeProducerForm from '../../forms/BecomeProducerForm';
import MetaData from '../../components/MetaData';

const BecomeProducer = () => (
  <>
    <MetaData title="Bonden.se | Bli producent" description="" />
    <Section id="become-producer" className="section-light" fullWidth>
      <Container>
        <Breadcrumb tag="nav" listTag="div" className="producer-breadcrumb">
          <BreadcrumbItem tag="a" href="/">
            Home
          </BreadcrumbItem>
          <BreadcrumbItem tag="a" href="/anvandare/mina-sidor">
            Mina Sidor
          </BreadcrumbItem>
          <BreadcrumbItem active tag="span" href="#">
            Bli Producent
          </BreadcrumbItem>
        </Breadcrumb>
        <h3>Ny Producent - uppgifter om verksamheten</h3>
        <Row>
          <Col>
            <p>
              Vänligen fyll uppgifterna i formuläret och skicka in. Notera att
              det är uppgifterna till gården som du ska fylla i. Vi handlägger
              nya ansökningaer så fort vi kan.
            </p>
          </Col>
        </Row>
        <BecomeProducerForm />
      </Container>
    </Section>
  </>
);

export default BecomeProducer;
