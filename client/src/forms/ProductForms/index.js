import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import { CATEGORIES_QUERY } from '../../graphql/categories';
import { CURRENCIES_QUERY } from '../../graphql/currency';
import './styles.css';
import UpdateProductForm from './UpdateProductForm';
import AddProductForm from './AddProductForm';

const ProductForm = ({ product }) => {
  const category = useQuery(CATEGORIES_QUERY);
  const currency = useQuery(CURRENCIES_QUERY);

  const {
    data: categoryData,
    loading: categoryLoading,
    error: categoryError,
  } = category;

  const {
    data: currencyData,
    loading: currencyLoading,
    error: currencyError,
  } = currency;

  const categories = categoryData?.categories;
  const currencies =
    currencyData &&
    currencyData.getCurrencies.map((element) => ({
      value: element.id,
      label: element.name,
    }));

  if (categoryError || currencyError) return <p>Error...</p>;

  return (
    <>
      {product ? (
        <UpdateProductForm
          categories={categories}
          cateoryLoading={categoryLoading}
          currencies={currencies}
          currencyLoading={currencyLoading}
          product={product}
        />
      ) : (
        <AddProductForm
          categories={categories}
          currencies={currencies}
          categoryLoading={categoryLoading}
          currencyLoading={currencyLoading}
        />
      )}
    </>
  );
};

ProductForm.propTypes = {
  product: PropTypes.object,
};

export default ProductForm;
