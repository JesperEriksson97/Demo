import React from 'react';
import { Row, Col, CardImg, Button, Input, InputGroup } from 'reactstrap';
import { inject, observer } from 'mobx-react';
import './styles.css';

const CartItem = ({ product, cart }) => (
  <>
    <Row className="border-top border-bottom">
      <Row className="cart-item-main align-items-center">
        <Col>
          <CardImg
            className="img-fluid"
            src={`${process.env.REACT_APP_GRAPHQL_SERVER}/static/media/${product.images[0]}`}
            alt={product.name}
          />
        </Col>
        <Col>
          <Row className="text-muted">{product.categories.join(', ')}</Row>
          <Row className="cart-item-name">{product.name}</Row>
        </Col>
        <Col md="3">
          <InputGroup className="addon-cart">
            <Button
              color="link"
              disabled={product.amount === 0}
              onClick={product.decrementAmount}
            >
              -
            </Button>
            <Input
              type="text"
              value={product.amount}
              onChange={(e) => product.changeAmount(Number(e.target.value))}
            />
            <Button
              type="button"
              color="link"
              onClick={product.incrementAmount}
            >
              +
            </Button>
          </InputGroup>
        </Col>
        <Col md="4">
          {product.price.toLocaleString('sv-Se', {
            currency: 'SEK',
            style: 'currency',
          })}
          {`/${product.format}`}
          <Button close onClick={() => cart.removeProduct(product)} />
        </Col>
      </Row>
    </Row>
  </>
);
export default inject('cart')(observer(CartItem));
