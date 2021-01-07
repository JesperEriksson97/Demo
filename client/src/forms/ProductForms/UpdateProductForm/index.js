import React from 'react';
import { useMutation } from '@apollo/client';
import Select from 'react-select';
import {
  Input,
  FormGroup,
  Label,
  Button,
  Form,
  FormFeedback,
  Spinner,
  Media,
  CustomInput,
  Row,
  Col,
  Container,
  FormText,
} from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import PropTypes from 'prop-types';
import { PRODUCT_UPDATE } from '../../../graphql/product';

import { FILE_UPDATE } from '../../../graphql/upload';
import { updateProductSchema } from '../../../validations/Product';
import { formats } from '../../../config/format';
import toast from '../../../utils/toast';

const UpdateProductForm = ({
  product,
  categories,
  categoryLoading,
  currencies,
  currencyLoading,
}) => {
  const history = useHistory();
  const [updateFile, { loading: fileLoading }] = useMutation(FILE_UPDATE);
  const [updateProduct, { loading: productLoading }] = useMutation(
    PRODUCT_UPDATE
  );

  const { register, handleSubmit, control, errors, setError } = useForm({
    defaultValues: {
      ...product,
      categories:
        categories &&
        categories.filter((cat) => product?.categories.includes(cat.value)),
      format:
        formats &&
        formats.find((format) => product?.format.includes(format.value)),
      currency:
        currencies &&
        currencies.find((cur) => product?.currency.name === cur.label),
    },
    mode: 'onChange',
    reValidateMode: 'onBlur',
    resolver: yupResolver(updateProductSchema),
  });

  const onSubmit = async (input) => {
    try {
      let productImage = product.images[0];

      if (input.image.length > 0) {
        const imageResponse = await updateFile({
          variables: { file: input.image[0], oldFile: productImage },
        });

        if (imageResponse.data) productImage = imageResponse.data.updateFile;
      }

      const response = await updateProduct({
        variables: {
          id: product.id,
          name: input.name,
          description: input.description,
          categories: input.categories.map((element) => element.value),
          images: [productImage],
          stock: input.stock,
          format: input.format.value,
          price: input.price,
          currencyId: input.currency.value,
        },
      });

      const { success, errors: serverErrors } = response.data.updateProduct;

      if (success) {
        toast.showSuccess({
          title: 'Sparad',
          message: 'Produkten har uppdaterats',
        });
        history.push({
          pathname: '/producent/mina-sidor/produkter',
          state: {
            name: product.organisation.name,
            address: product.organisation.address,
          },
        });
      } else {
        let toastError = null;
        serverErrors.forEach((err) => {
          if (err.path === 'toast-error') {
            toastError = err.message;
          } else {
            setError(err.path, {
              message: err.message,
            });
          }
        });

        if (toastError) {
          toast.showError({
            title: 'Error',
            message: toastError,
          });
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Container>
        <Form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Media
            middle
            className="img-fluid product-image-form"
            object
            src={`${process.env.REACT_APP_GRAPHQL_SERVER}/static/media/${product.images[0]}`}
            alt={product.name}
          />
          <FormGroup className="pb-2 pt-2">
            <FormText>
              Välj ny bild för produkten här om bilden skall bytas
            </FormText>
            <CustomInput
              id="change-image-input"
              type="file"
              name="image"
              label="Byt bild"
              innerRef={register()}
              invalid={!!errors.image}
            />
            {errors.image?.message && (
              <div className="invalid-feedback d-block">
                {errors.image.message}
              </div>
            )}
          </FormGroup>

          <FormGroup className="pb-2">
            <Label htmlFor="name">Namn på produkten</Label>
            <Input
              autoFocus
              id="name"
              placeholder="Namn på produkten"
              type="text"
              name="name"
              innerRef={register}
              invalid={!!errors.name}
            />
            <FormFeedback>{errors.name?.message}</FormFeedback>
          </FormGroup>
          <FormGroup className="pb-2">
            <Label htmlFor="description">Beskrivning av produkten</Label>

            <Input
              autoFocus
              id="description"
              placeholder="Beskrivning av produkten"
              type="textarea"
              name="description"
              innerRef={register}
              invalid={!!errors.description}
            />
            <FormFeedback>{errors.description?.message}</FormFeedback>
          </FormGroup>
          <FormGroup className="pb-2">
            <Label htmlFor="categories">Lägg till kategorier</Label>
            <Controller
              as={Select}
              name="categories"
              control={control}
              invalid={!!errors.categories}
              options={categories}
              innerRef={register}
              isMulti
              placeholder="Kategorier"
              isLoading={categoryLoading || !categories}
            />
            {errors.categories?.message && (
              <div className="invalid-feedback d-block">
                {errors.categories.message}
              </div>
            )}
          </FormGroup>
          <Row form className="pb-2">
            <Col sm={12} md={6}>
              <FormGroup>
                <Label htmlFor="format">Lägg till Enhet</Label>
                <Controller
                  as={Select}
                  name="format"
                  placeholder="Enhet produkten säljs i"
                  isMulti={false}
                  control={control}
                  innerRef={register}
                  options={formats}
                  invalid={!!errors.format}
                />
                {errors.format?.message && (
                  <div className="invalid-feedback d-block">
                    {errors.format.message}
                  </div>
                )}
              </FormGroup>
            </Col>
            <Col sm={12} md={6}>
              <FormGroup>
                <Label htmlFor="stock">Antal i lager</Label>
                <Input
                  autoFocus
                  id="stock"
                  placeholder="Antal produkter i lager"
                  type="number"
                  name="stock"
                  innerRef={register}
                  invalid={!!errors.stock}
                />
                <FormFeedback>{errors.stock?.message}</FormFeedback>
              </FormGroup>
            </Col>
          </Row>
          <Row form className="pb-2">
            <Col sm={12} md={6}>
              <FormGroup>
                <Label htmlFor="price">Ange pris</Label>
                <Input
                  autoFocus
                  id="price"
                  placeholder="Pris för produkten per vald enhet"
                  type="number"
                  name="price"
                  innerRef={register}
                  invalid={!!errors.price}
                />
                <FormFeedback>{errors.price?.message}</FormFeedback>
              </FormGroup>
            </Col>
            <Col sm={12} md={6}>
              <FormGroup>
                <Label htmlFor="currency">Lägg till valuta</Label>
                <Controller
                  as={Select}
                  name="currency"
                  placeholder="Valuta"
                  control={control}
                  innerRef={register}
                  options={currencies}
                  isMulti={false}
                  invalid={!!errors.currency}
                  isLoading={currencyLoading || !currencies}
                />
                {errors.currency?.message && (
                  <div className="invalid-feedback d-block">
                    {errors.currency.message}
                  </div>
                )}
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <Button
              type="submit"
              className="btn btn-green"
              disabled={fileLoading || productLoading}
              block
            >
              {fileLoading || productLoading ? (
                <Spinner size="sm" role="status" className="mr-2" />
              ) : (
                'Spara ändringar'
              )}
            </Button>
          </FormGroup>
        </Form>
      </Container>
    </>
  );
};

UpdateProductForm.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.any,
    name: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    format: PropTypes.string,
    images: PropTypes.array,
    stock: PropTypes.any,
    currency: PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.any,
    }),
    categories: PropTypes.array,
  }),
  categories: PropTypes.array,
  categoryLoading: PropTypes.bool,
  currencyLoading: PropTypes.bool,
  currencies: PropTypes.array,
};

export default UpdateProductForm;
