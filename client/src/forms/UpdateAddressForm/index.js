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
import { schema } from '../../validations/Address';
import { ADDRESS_UPDATE } from '../../graphql/address';
import './style.css';

const UpdateAddressForm = ({ address }) => {
  const [updateAddress, { loading }] = useMutation(ADDRESS_UPDATE);
  const { register, handleSubmit, errors, setError } = useForm({
    mode: 'onChange',
    reValidateMode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: !address ? {} : address,
  });

  const onSubmit = async (input) => {
    const response = await updateAddress({
      variables: {
        street: input.street,
        city: input.city,
        zip: input.zip,
      },
    });

    const { success, errors: serverErrors } = response.data.updateAddress;

    if (success) {
      /* Handle success */
      console.log('Address was successfully updated');
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
        </FormGroup>
      </Form>
    </>
  );
};

export default UpdateAddressForm;
