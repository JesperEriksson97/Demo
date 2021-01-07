import React from 'react';
import { Card, CardBody, CardSubtitle, CardText, CardImg } from 'reactstrap';
import { products } from '../../config/products';
import Carousel from '../Carousel';
import './styles.css';

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 1501 },
    items: 6,
  },
  desktop: {
    breakpoint: { max: 1500, min: 1025 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 468 },
    items: 3,
  },

  mobile: {
    breakpoint: { max: 467, min: 0 },
    items: 2,
  },
};

const ProductCarousel = () => (
  <>
    <Carousel autoPlay={false} customResponsive={responsive} arrows>
      {products &&
        products.map(({ img, name, producer }, index) => (
          <Card key={index} className="featured-products">
            <CardBody>
              <CardImg src={img} className="img-fluid featured-products-img" />
              <div className="featured-products-text-container">
                <CardText className="featured-products-text">{name}</CardText>
                <CardSubtitle tag="h6" className="mb-2 text-muted">
                  {producer}
                </CardSubtitle>
              </div>
            </CardBody>
          </Card>
        ))}
    </Carousel>
  </>
);

export default ProductCarousel;
