/* eslint-disable import/no-dynamic-require */
import { useQuery } from '@apollo/client';
import React from 'react';
import {
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardImg,
  Button,
  NavLink,
} from 'reactstrap';
import Carousel from '../components/Carousel';
import { farmersArticles } from '../config/articles/farmers';
import { seasonalFacts } from '../config/articles/seasonalFacts';
import Login from '../components/Login';
import { ReactComponent as Checkmark } from '../icons/checkmark.svg';
import Header from '../components/Header';
import Section from '../components/Section';
import ProductCarousel from '../components/ProductCarousel';
import { USER_QUERY } from '../graphql/user';
import MetaData from '../components/MetaData';

const Home = () => {
  const userData = useQuery(USER_QUERY);
  const { error, loading, data } = userData;

  if (loading || !data) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  /* const { id, username } = data.user; */
  console.log(data);
  return (
    <>
      <MetaData
        title="Bonden.se | Bytt är bytt"
        description="Här köper och säljer du lätt dina lokalproducerade produkter"
      />
      <Header />
      <Section fullWidth className="home-section">
        <Row>
          <Col lg="5" md="6">
            <div id="seasonal">
              <h2>SÄSONGSVAROR</h2>
              <ListGroup>
                {seasonalFacts &&
                  seasonalFacts.map((element, index) => (
                    <ListGroupItem className="seasonal-product" key={index}>
                      <ListGroupItemHeading>
                        <Checkmark />
                      </ListGroupItemHeading>
                      <ListGroupItemText className="seasonal-products-text">
                        {element.text}
                      </ListGroupItemText>
                    </ListGroupItem>
                  ))}
              </ListGroup>
              <Login>
                <Row className="home-login pb-2">
                  <small>För att se vad som är till salu där du bor:</small>
                  <NavLink href="#logga-in">
                    <Button size="sm" className="btn-blue">
                      Logga in
                    </Button>
                  </NavLink>
                </Row>
              </Login>
            </div>
          </Col>
          <Col lg="7" md="6">
            <div id="our-farmers">
              <h3>Träffa våra bönder</h3>
              <Carousel autoPlay arrows={false}>
                {farmersArticles &&
                  farmersArticles.map(({ img, text, sub }, index) => (
                    <Card key={index}>
                      <CardBody>
                        <CardImg src={img} />
                        <CardText>{text}</CardText>
                        <CardSubtitle tag="h6" className="mb-2 text-muted">
                          {sub}
                        </CardSubtitle>
                      </CardBody>
                    </Card>
                  ))}
              </Carousel>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div id="products-for-sale">
              <h3>Lokala varor till salu</h3>
              <ProductCarousel />
            </div>
          </Col>
        </Row>
      </Section>
    </>
  );
};

export default Home;
