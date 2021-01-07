import React from 'react';
import {
  Input,
  FormGroup,
  Label,
  Button,
  FormFeedback,
  Form,
  Row,
  Col,
} from 'reactstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@apollo/client';
import { ADDRESS_ADD } from '../../graphql/address';
import { schema } from '../../validations/Address';
import './style.css';

const CreateAddressForm = () => {
  const [addAddress, { data, loading }] = useMutation(ADDRESS_ADD);
  const { register, handleSubmit, errors, setError } = useForm({
    mode: 'onChange',
    reValidateMode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const onSubmit = async (input) => {
    const response = await addAddress({
      variables: {
        street: input.street,
        city: input.city,
        zip: input.zip,
      },
    });

    const { success, errors: serverErrors } = response.data.addAddress;

    if (success) {
      /* Handle success */
      console.log('Address was successfully created');
    } else {
      serverErrors.forEach((err) => {
        setError(err.path, {
          message: err.message,
        });
      });
    }
  };

  return (
    <>
      <Form
        className="settings-form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <FormGroup>
          <Label htmlFor="street">Address</Label>
          <Input
            autoFocus
            id="street"
            placeholder="Adress"
            type="text"
            name="street"
            innerRef={register}
            invalid={!!errors.street}
          />
          <FormFeedback>{errors.street?.message}</FormFeedback>
        </FormGroup>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label htmlFor="zip">Postnummer</Label>
              <Input
                id="zip"
                placeholder="Postnummer"
                type="text"
                name="zip"
                innerRef={register()}
                invalid={!!errors.zip}
              />
              <FormFeedback>{errors.zip?.message}</FormFeedback>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label htmlFor="city">Stad</Label>
              <Input
                id="city"
                placeholder="Stad"
                type="text"
                name="city"
                innerRef={register()}
                invalid={!!errors.city}
              />
              <FormFeedback>{errors.city?.message}</FormFeedback>
            </FormGroup>
          </Col>
        </Row>
        <FormGroup>
          <Button
            disabled={loading}
            type="submit"
            className="btn btn-green"
            block
          >
            Spara
          </Button>
          <div className="has-success">
            {data?.addAddress?.success && 'Adress sparad'}
          </div>
        </FormGroup>
      </Form>
    </>
  );
};

export default CreateAddressForm;
