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
  Row,
  Col,
  CustomInput,
  FormText,
} from 'reactstrap';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import PropTypes from 'prop-types';
import { PRODUCT_ADD } from '../../../graphql/product';
import { FILE_UPLOAD } from '../../../graphql/upload';
import { ME_QUERY_PRODUCTS } from '../../../graphql/user';
import toast from '../../../utils/toast';
import { addProductSchema } from '../../../validations/Product';
import { formats } from '../../../config/format';

const AddProductForm = ({
  categories,
  currencies,
  categoryLoading,
  currencyLoading,
}) => {
  const [uploadFile, { loading: fileLoading }] = useMutation(FILE_UPLOAD);
  const [addProduct, { loading: productLoading }] = useMutation(PRODUCT_ADD);

  const { register, handleSubmit, control, errors, setError, reset } = useForm({
    mode: 'onChange',
    reValidateMode: 'onBlur',
    resolver: yupResolver(addProductSchema),
  });

  const onSubmit = async ({ image: [file], ...input }) => {
    try {
      const imageResponse = await uploadFile({ variables: { file } });
      const response = await addProduct({
        variables: {
          name: input.name,
          description: input.description,
          categories: input.categories.map((element) => element.value),
          images: [imageResponse.data?.uploadFile],
          stock: input.stock,
          format: input.format.value,
          price: input.price,
          currencyId: input.currency.value,
        },
        update: async (cache, { data }) => {
          const newProduct = data?.addProduct?.product;
          const existingProducts = await cache.readQuery({
            query: ME_QUERY_PRODUCTS,
          }).me?.organisation;

          if (existingProducts && newProduct) {
            cache.writeQuery({
              query: ME_QUERY_PRODUCTS,
              data: {
                me: {
                  organisation: {
                    products: [...existingProducts?.products, newProduct],
                  },
                },
              },
            });
          }
        },
      });

      const { success, errors: serverErrors } = response.data.addProduct;

      if (success) {
        toast.showSuccess({
          title: 'Sparad',
          message: 'Produkten har sparats',
        });
        reset();
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
      <Form
        className="product-form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
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
        </Row>
        <FormGroup className="pb-2 pt-2">
          <FormText>Välj bildfil för produkten här</FormText>
          <CustomInput
            id="addProduct-image-input"
            type="file"
            name="image"
            label="Lägg till bild"
            innerRef={register()}
            invalid={!!errors.image}
          />
          {errors.image?.message && (
            <div className="invalid-feedback d-block">
              {errors.image.message}
            </div>
          )}
        </FormGroup>
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
              'Lägg till'
            )}
          </Button>
        </FormGroup>
      </Form>
    </>
  );
};

AddProductForm.propTypes = {
  categories: PropTypes.array,
  categoryLoading: PropTypes.bool,
  currencyLoading: PropTypes.bool,
  currencies: PropTypes.array,
};

export default AddProductForm;
