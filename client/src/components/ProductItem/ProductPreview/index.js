import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Media,
  Button,
  InputGroup,
  Label,
  Input,
  Row,
  Col,
} from 'reactstrap';
import { MAX_AMOUNT } from '../../../config/constants';
import MetaData from '../../MetaData';
import { ReactComponent as GeoPin } from '../../../icons/geopin.svg';
import IconText from '../../IconText';
import './styles.css';

const ProductPreview = ({ product, address, name }) => {
  const [amount, setAmount] = useState(1);

  const updateAmount = (value) => {
    if (Number(value) && value > 0 && value < MAX_AMOUNT) {
      setAmount(Number(value));
    }
  };

  return (
    <>
      <Container id="product-container">
        <MetaData title={`Bonden.se | ${product.name}`} description="" />
        <Media middle>
          <Media href="#">
            <Media
              object
              src={`${process.env.REACT_APP_GRAPHQL_SERVER}/static/media/${product.images[0]}`}
              alt={product.name}
              className="product-image"
            />
          </Media>
          <Media body className="product-content">
            <div className="product-details text-muted">
              {address.length > 0 && (
                <IconText
                  icon={GeoPin}
                  text={`${address[0].street}, ${address[0].city}`}
                />
              )}
            </div>
            <div className="product-description">
              <Media heading className="product-main-heading">
                {product.name}
              </Media>
              <p className="product-price">
                Pris: {product.price} kr/{product.format}
              </p>
              <h5 className="product-sub-heading">Beskrivning</h5>
              <p>{product.description}</p>
            </div>
            <div className="product-producer">
              <h6>Säljes av: </h6>
              <p>{name}</p>
            </div>
            <InputGroup className="add-to-cart">
              <Row>
                <Col md={3} className="amount-label">
                  <Label htmlFor="amount" className="preview-amount-label">
                    Antal ({product.format}):
                  </Label>
                </Col>
                <Col md={3}>
                  <Input
                    type="number"
                    id="amount"
                    name="amount"
                    defaultValue={amount}
                    placeholder="Antal"
                    onChange={(e) => updateAmount(e.target.value)}
                  />
                </Col>
                <Col md={5}>
                  <Button className="preview-add-to-cart-btn" disabled>
                    {' '}
                    Lägg i kundvagn
                  </Button>
                </Col>
              </Row>
            </InputGroup>
          </Media>
        </Media>
      </Container>
    </>
  );
};

ProductPreview.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    format: PropTypes.string,
    images: PropTypes.array,
  }),
  address: PropTypes.array,
  name: PropTypes.string,
};
export default ProductPreview;
