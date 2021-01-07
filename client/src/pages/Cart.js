import React from 'react';
import { inject, observer } from 'mobx-react';
import {
  Container,
  Col,
  Card,
  Row,
  CardTitle,
  Button,
  Input,
  CardSubtitle,
} from 'reactstrap';
import CartItem from '../components/CartItem';
import toast from '../utils/toast';
import MetaData from '../components/MetaData';

const Cart = ({ cart, currentUser }) => {
  const { address, firstname, lastname, email } = currentUser;
  const onPurchase = () => {
    if (!address || !firstname || !lastname) {
      return toast.showError({
        title: 'Varning',
        message:
          'Användarinformation saknas, gå till mina sidor för att slutföra dina profilinställningar',
      });
    }
    const obj = cart.purchase();
    const products = { ...obj, customer: email };
    console.log(products);
    cart.emptyCart();
    toast.showSuccess({
      title: 'Tack för ditt köp',
      message: 'Din beställning är registrerad',
    });
  };

  return (
    <Container className="cart-container">
      <MetaData
        title={`Bonden.se | Kundvagn(${cart.getProducts().length})`}
        description=""
      />
      <Card className="card-cart">
        <Row>
          <Col md="8" className="cart">
            <CardTitle className="cart-title">Kundvagn</CardTitle>
            {cart.getProducts().length > 0 ? (
              cart
                .getProducts()
                .map((product, index) => (
                  <CartItem key={index} product={product} />
                ))
            ) : (
              <div>
                <h5>Varukorgen är tom</h5>
              </div>
            )}
          </Col>
          <Col md="4" className="cart-summary">
            <CardTitle className="cart-title">Sammanfattning</CardTitle>
            <hr />
            <Row>
              <Col style={{ paddingLeft: '1rem', marginBottom: '1rem' }}>
                Varor {cart.getProducts().length}
              </Col>
              <Col className="text-right">
                {cart.getPrice()
                  ? cart.getPrice().toLocaleString('sv-Se', {
                      currency: 'SEK',
                      style: 'currency',
                    })
                  : ''}
              </Col>
            </Row>
            <div className="cart-delivery">
              <CardSubtitle>Leverans</CardSubtitle>
              <Input
                type="select"
                name="delivery"
                onChange={(e) => cart.changeDelivery(e.target.value)}
              >
                <option value="pickup" className="text-muted">
                  utlämningsadress
                </option>
                <option value="home" className="text-muted">
                  hemleverans
                </option>
              </Input>
            </div>
            <div className="cart-discount">
              <CardSubtitle>Rabatt</CardSubtitle>{' '}
              <p className="text-muted">Ingen rabatt </p>
            </div>
            <Row style={{ padding: '2vh 0' }}>
              <Col>TOTALT PRIS: </Col>
              <Col className="text-right">
                {cart.getPrice()
                  ? cart.getPrice().toLocaleString('sv-Se', {
                      currency: 'SEK',
                      style: 'currency',
                    })
                  : ''}
              </Col>
            </Row>
            <Button type="button" className="buy-btn" onClick={onPurchase}>
              KÖP
            </Button>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default inject('cart')(observer(Cart));
