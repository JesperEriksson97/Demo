import React, { useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  CardBody,
  Spinner,
  Card,
  CardTitle,
  CardText,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { useLocation } from 'react-router';
import {
  PRODUCT_BY_CATEGORY_QUERY,
  PRODUCT_ALL_QUERY,
} from '../graphql/product';
import Searchbar from '../components/Searchbar';
import MetaData from '../components/MetaData';

const Products = () => {
  const location = useLocation();
  const { filter } = location.state;

  const [
    getProductsByCategory,
    { data: filteredProducts, loading: filteredLoading, error: filteredError },
  ] = useLazyQuery(PRODUCT_BY_CATEGORY_QUERY, {
    skip: !filter,
    variables: {
      category: filter && filter.map(({ value }) => value),
    },
  });

  const [
    getAllProducts,
    { data: allProducts, loading: allLoading, error: allError },
  ] = useLazyQuery(PRODUCT_ALL_QUERY, {
    skip: filter,
  });

  useEffect(() => (filter ? getProductsByCategory() : getAllProducts()), [
    filter,
  ]);

  if (allError || filteredError) return <p>Error</p>;

  const products = filter
    ? filteredProducts?.getProductsByCategory.products
    : allProducts?.getAllProducts;

  console.log(products);

  return (
    <>
      <MetaData
        title="Bonden.se | Produkter"
        description="Produkterna som kommer från de lokala producenterna"
      />
      <Container className="product-list">
        <Searchbar defaultCategory={filter || ''} />
        {allLoading || filteredLoading ? (
          <div className="mb-4">
            <Spinner className="mr-2" /> Hämtar produkter...
          </div>
        ) : (
          <div>
            <h6>Sök resultat:</h6>
            <Row>
              {products &&
                products.map((product, index) => (
                  <Col lg="4" md="6" sm="12" key={index}>
                    <Card className="products-card">
                      <Link
                        to={{
                          pathname: `produkter/produkt/${product.id}`,
                          state: {
                            filter,
                          },
                        }}
                      >
                        <figure>
                          <img
                            className="img-fluid products-img"
                            src={`${process.env.REACT_APP_GRAPHQL_SERVER}/static/media/${product.images[0]}`}
                            alt={product.name}
                          />
                        </figure>
                      </Link>
                      <CardBody>
                        <CardTitle
                          tag={Link}
                          to={{
                            pathname: `produkter/produkt/${product.id}`,
                            state: {
                              filter,
                            },
                          }}
                          className="products-name"
                        >
                          {product.name}
                        </CardTitle>
                        <CardText className="pt-1 mb-0">
                          {product.organisation.name},{' '}
                          {product.organisation.address[0].city}
                        </CardText>
                        <h5 className="pt-1">{`${product.price} kr/${product.format}`}</h5>
                      </CardBody>
                    </Card>
                  </Col>
                ))}
            </Row>
          </div>
        )}
      </Container>
    </>
  );
};

export default Products;
