import React from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import { useQuery } from '@apollo/client';
import {
  Row,
  Col,
  Container,
  Spinner,
  Breadcrumb,
  BreadcrumbItem,
} from 'reactstrap';
import ProductForm from '../../forms/ProductForms';
import Section from '../../components/Section';
import MetaData from '../../components/MetaData';
import { PRODUCT_QUERY } from '../../graphql/product';

const EditProduct = () => {
  const { id } = useParams();
  const getProduct = useQuery(PRODUCT_QUERY, {
    variables: { id },
  });

  const { data, error, loading } = getProduct;
  const product = data?.getProduct;

  if (error) return <p>Error</p>;

  return (
    <>
      <MetaData title="Bonden.se | Ändra Produkt" description="" />
      <Section className="section-light" fullWidth>
        <Container>
          <Breadcrumb tag="nav" listTag="div">
            <BreadcrumbItem tag={Link} to="/">
              Home
            </BreadcrumbItem>
            <BreadcrumbItem tag={Link} to="/anvandare/mina-sidor">
              Mina Sidor
            </BreadcrumbItem>
            <BreadcrumbItem tag={Link} to="/producent/mina-sidor">
              Hantera Organisation
            </BreadcrumbItem>
            <BreadcrumbItem
              tag={Link}
              to={{
                pathname: `/producent/mina-sidor/produkter`,
                state: {
                  name: product?.organisation?.name,
                  address: product?.organisation?.address,
                },
              }}
            >
              Mina Produkter
            </BreadcrumbItem>
            <BreadcrumbItem active tag="span" href="#">
              Ändra produkt
            </BreadcrumbItem>
          </Breadcrumb>
          <h3 className="text-center mb-4 mt-4">
            Ändra Produkt: {product?.name}
          </h3>
          <hr />
          <Row>
            <Col>
              {loading || !product ? (
                <div>
                  <Spinner /> Hämtar produkt...
                </div>
              ) : (
                <ProductForm product={product} />
              )}
            </Col>
          </Row>
        </Container>
      </Section>
    </>
  );
};
export default EditProduct;
