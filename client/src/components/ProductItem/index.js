import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardBody,
  CardTitle,
  CardImg,
  Col,
  Button,
  Row,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { ReactComponent as Edit } from '../../icons/edit.svg';
import { ReactComponent as Preview } from '../../icons/preview.svg';
import CustomModal from '../CustomModal';
import ProductPreview from './ProductPreview';
import './styles.css';

const ProductItem = ({ product, address, name }) => {
  const [isOpen, setIsOpen] = useState(false);
  const onPreview = () => setIsOpen(true);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <CustomModal
        id="preview-modal"
        header
        title={`Granskar produkt: ${product.name}`}
        content={
          <ProductPreview product={product} address={address} name={name} />
        }
        show={isOpen}
        toggle={toggle}
      />
      <Col lg="4" md="6" sm="12" key={product.id} className="mb-4">
        <Card>
          <CardImg
            className="active-product-img"
            src={`${process.env.REACT_APP_GRAPHQL_SERVER}/static/media/${product.images[0]}`}
            alt={product.name}
          />
          <CardBody className="pt-2">
            <CardTitle className="active-product-title">
              {product.name}
            </CardTitle>
            <Row className="active-products-menu">
              <Col lg={6} sm={12}>
                <Link
                  to={`/producent/mina-sidor/produkter/andra-produkt/${product.id}`}
                  className="edit-link"
                >
                  <Edit />
                  <span> Ändra</span>
                </Link>
              </Col>
              <Col>
                <Button
                  color="link"
                  className="preview-button"
                  onClick={onPreview}
                >
                  <Preview /> Granska
                </Button>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

ProductItem.propTypes = {
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

export default ProductItem;
