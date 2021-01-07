import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Row, Col, Form } from 'reactstrap';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { useQuery } from '@apollo/client';
import { useForm, Controller } from 'react-hook-form';
import { ReactComponent as Geopin } from '../../icons/geopin.svg';
import { ReactComponent as Tag } from '../../icons/tag.svg';

import IconText from '../IconText';
import { CATEGORIES_QUERY } from '../../graphql/categories';
import { locations } from './locations';
import './style.css';

const Searchbar = ({ defaultCategory }) => {
  const history = useHistory();
  const animatedComponents = makeAnimated();
  const category = useQuery(CATEGORIES_QUERY);

  const { register, handleSubmit, control } = useForm({
    defaultValues: { 'categories': null, 'location': null },
    mode: 'onChange',
    reValidateMode: 'onBlur',
  });

  const {
    data: categoryData,
    loading: categoryLoading,
    error: categoryError,
  } = category;

  if (categoryError) return <p>Error</p>;

  const onSubmit = ({ categories }) => {
    history.push({
      pathname: `/produkter`,
      search: categories
        ? `?${categories.map(({ value }) => `kategori=${value}`).join('&')}`
        : '',
      state: {
        filter: categories,
      },
    });
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Row form className="searchbar">
          <Col md={5} className="searchbar-space">
            <Controller
              as={Select}
              name="categories"
              control={control}
              innerRef={register}
              classNamePrefix="searchbar-select"
              closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              isLoading={categoryLoading}
              defaultValue={defaultCategory || ''}
              options={categoryData?.categories}
              placeholder={<IconText icon={Tag} text="Alla kategorier..." />}
            />
          </Col>
          <Col md={5} className="searchbar-space">
            <Controller
              as={Select}
              name="location"
              control={control}
              innerRef={register}
              classNamePrefix="searchbar-select"
              closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              options={locations}
              placeholder={<IconText icon={Geopin} text="Hela kronoberg..." />}
            />
          </Col>
          <Col md={2} className="searchbar-space">
            <Button block className="btn-blue" size="lg" type="submit">
              Sök
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Searchbar;
