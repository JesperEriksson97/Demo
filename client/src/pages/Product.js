import React, { useState } from 'react';
import { useParams, useLocation } from 'react-router';
import { inject, observer } from 'mobx-react';
import {
  Container,
  Media,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  InputGroup,
  Label,
  Input,
  Row,
  Col,
  Spinner,
  NavLink,
} from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { ReactComponent as GeoPin } from '../icons/geopin.svg';
import { ReactComponent as Clock } from '../icons/clock.svg';
import IconText from '../components/IconText';
import Login from '../components/Login';
import { MAX_AMOUNT } from '../config/constants';
import { PRODUCT_QUERY } from '../graphql/product';
import MetaData from '../components/MetaData';

const Product = ({ currentUser, cart }) => {
  const location = useLocation();
  const { filter } = location.state;
  const { id } = useParams();
  const history = useHistory();
  const [amount, setAmount] = useState(1);
  const getProduct = useQuery(PRODUCT_QUERY, {
    variables: { id },
  });

  const { data, error, loading } = getProduct;
  const product = data?.getProduct;

  if (error) return <p>Error</p>;

  if (loading)
    return (
      <div className="mb-4">
        <Spinner className="mr-2" /> Hämtar produkt...
      </div>
    );

  const updateAmount = (value) => {
    if (Number(value) && value > 0 && value < MAX_AMOUNT) {
      setAmount(Number(value));
    }
  };

  const onClickProducts = () => {
    history.push({
      pathname: `/produkter`,
      search: '',
      state: {
        categories: null,
      },
    });
  };

  const onClickCategories = () => {
    const search =
      filter &&
      filter.map((category) => `kategori=${category.value}`).join('&');
    history.push({
      pathname: `/produkter`,
      search: filter ? `?${search}` : '',
      state: {
        filter,
      },
    });
  };

  return (
    <>
      {product ? (
        <Container id="product-container">
          <MetaData title={`Bonden.se | ${product.name}`} description="" />
          <Breadcrumb tag="nav" listTag="div">
            <BreadcrumbItem tag="a" href="/">
              Home
            </BreadcrumbItem>
            <BreadcrumbItem tag="a" onClick={onClickProducts}>
              Produkter
            </BreadcrumbItem>
            {filter && (
              <BreadcrumbItem tag="a" onClick={onClickCategories}>
                {filter.map((category) => category.label).join('&')}
              </BreadcrumbItem>
            )}
            <BreadcrumbItem active tag="span" href="#">
              {product.name}
            </BreadcrumbItem>
          </Breadcrumb>
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
                {/* TODO: Fix support on backend
                <IconText
                  icon={Clock}
                  text={`Inlagd: ${product.createdAt.toLocaleDateString()}`}
                /> */}
                <IconText
                  icon={GeoPin}
                  text={`${product.organisation.address[0].street}, ${product.organisation.address[0].city}`}
                />
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
                <p>{product.organisation.name}</p>
              </div>
              {currentUser ? (
                <InputGroup className="add-to-cart">
                  <Row>
                    <Col md={1} className="amount-label">
                      <Label className="amount-label" htmlFor="amount">
                        Antal ({product.format}):{' '}
                      </Label>
                    </Col>
                    <Col md={4}>
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
                      <Button
                        onClick={() => cart.addProduct({ ...product, amount })}
                        className="btn-blue"
                      >
                        {' '}
                        Lägg i kundvagn
                      </Button>
                    </Col>
                  </Row>
                </InputGroup>
              ) : (
                <Login>
                  <Row className="buy-login">
                    <p>För att kunna köpa: </p>
                    <NavLink href="#logga-in" className="p-0">
                      <Button className="btn-blue mb-2 ml-2">Logga in</Button>
                    </NavLink>
                  </Row>
                </Login>
              )}
            </Media>
          </Media>
        </Container>
      ) : (
        <Spinner style={{ width: '3rem', height: '3rem' }} />
      )}
    </>
  );
};
export default inject('cart')(observer(Product));
