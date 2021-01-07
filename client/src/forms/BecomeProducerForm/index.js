import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Input,
  FormGroup,
  Label,
  FormFeedback,
  Button,
  Row,
  Col,
  Spinner,
} from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { useMutation, useApolloClient } from '@apollo/client';
import { becomeProducentSchema } from '../../validations/User';
import { ORGANISATION_ADD } from '../../graphql/organisation';
import { ADDRESS_ORG_ADD } from '../../graphql/address';
import { clearToken } from '../../utils/tokenService';
import toast from '../../utils/toast';

const BecomeProducerForm = () => {
  const history = useHistory();
  const client = useApolloClient();
  const [addOrganisation, { loading: orgLoading }] = useMutation(
    ORGANISATION_ADD
  );
  const [addOrgAddress, { loading: addressLoading }] = useMutation(
    ADDRESS_ORG_ADD
  );
  const [checked, setChecked] = useState(false);
  const [delivAddress, setDelivAddress] = useState({
    street: '',
    zip: '',
    city: '',
  });

  const { register, handleSubmit, errors, getValues, setError } = useForm({
    mode: 'onChange',
    reValidateMode: 'onBlur',
    resolver: yupResolver(becomeProducentSchema),
  });

  useEffect(() => {
    if (checked) {
      setDelivAddress({
        ...delivAddress,
        street: getValues('street'),
        zip: getValues('zip'),
        city: getValues('city'),
      });
    }
  }, [checked]);

  const toggle = () => setChecked(!checked);

  const onSubmit = async (input) => {
    const org = await addOrganisation({
      variables: { name: input.name, org_nr: input.org_nr },
    });

    const {
      success: orgSuccess,
      errors: orgServerErrors,
    } = org.data.addOrganisation;

    const address =
      orgSuccess && (await addOrgAddress({ variables: { ...delivAddress } }));

    if (address?.data?.addOrgAddress.success && orgSuccess) {
      clearToken();
      await client.resetStore();
      history.push('/');
      toast.showSuccess({
        title: 'Success',
        message:
          'Du måste logga in igen för att får tillgång till alla tjänster som producent.',
      });
    } else {
      return orgServerErrors.length > 0
        ? orgServerErrors.forEach((err) => {
            setError(err.path, {
              message: err.message,
            });
          })
        : toast.showError({
            title: 'Varning',
            message: 'Utlämningsadress kunde inte spara',
          });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Row form>
          <Col md="6" className="form-col">
            <h5>Kontaktinformation</h5>
            <FormGroup>
              <Label htmlFor="org_nr">Organisationsnummer</Label>
              <Input
                autoFocus
                id="org_nr"
                type="text"
                name="org_nr"
                innerRef={register}
                invalid={!!errors.org_nr}
              />
              <FormFeedback>{errors.org_nr?.message}</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="name">Organisationsnamn</Label>
              <Input
                id="name"
                type="text"
                name="name"
                innerRef={register}
                invalid={!!errors.name}
              />
              <FormFeedback>{errors.name?.message}</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="email">E-post</Label>
              <Input
                id="email"
                type="email"
                name="email"
                innerRef={register}
                invalid={!!errors.email}
              />
              <FormFeedback> {errors.email?.message}</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="phone">Telefonnummer</Label>
              <Input
                id="phone"
                type="text"
                name="phone"
                innerRef={register}
                invalid={!!errors.phone}
              />
              <FormFeedback>{errors.phone?.message}</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="street">Address</Label>
              <Input
                id="street"
                type="text"
                name="street"
                innerRef={register}
                invalid={!!errors.street}
                onChange={(e) =>
                  checked
                    ? setDelivAddress({
                        ...delivAddress,
                        street: e.target.value,
                      })
                    : {}
                }
              />
              <FormFeedback>{errors.street?.message}</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="zip">Postnummer</Label>
              <Input
                id="zip"
                type="text"
                name="zip"
                innerRef={register}
                invalid={!!errors.zip}
                onChange={(e) =>
                  checked
                    ? setDelivAddress({ ...delivAddress, zip: e.target.value })
                    : {}
                }
              />
              <FormFeedback>{errors.zip?.message}</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="city">Ort</Label>
              <Input
                id="city"
                type="text"
                name="city"
                innerRef={register}
                invalid={!!errors.city}
                onChange={(e) =>
                  checked
                    ? setDelivAddress({ ...delivAddress, city: e.target.value })
                    : {}
                }
              />
              <FormFeedback>{errors.city?.message}</FormFeedback>
            </FormGroup>
          </Col>
          <Col md="6" className="form-col">
            <h5>Utlämningsställe</h5>
            <FormGroup>
              <Label htmlFor="delivPointStreet">Address</Label>

              <Input
                id="delivPointStreet"
                type="text"
                name="delivPointStreet"
                innerRef={register}
                value={delivAddress.street}
                onChange={(e) =>
                  setDelivAddress({ ...delivAddress, street: e.target.value })
                }
                invalid={!!errors.delivPointStreet}
              />

              <FormFeedback>{errors.delivPointStreet?.message}</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="delivPointZip">Postnummer</Label>
              <Input
                id="delivPointZip"
                type="text"
                name="delivPointZip"
                innerRef={register}
                invalid={!!errors.delivPointZip}
                value={delivAddress.zip}
                onChange={(e) =>
                  setDelivAddress({ ...delivAddress, zip: e.target.value })
                }
              />
              <FormFeedback>{errors.delivPointZip?.message}</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="delivPointCity">Ort</Label>
              <Input
                id="delivPointCity"
                type="text"
                name="delivPointCity"
                innerRef={register}
                invalid={!!errors.delivPointCity}
                value={delivAddress.city}
                onChange={(e) =>
                  setDelivAddress({ ...delivAddress, city: e.target.value })
                }
              />
              <FormFeedback>{errors.delivPointCity?.message}</FormFeedback>
            </FormGroup>
            <FormGroup check>
              <Label htmlFor="delivPointSame" check>
                <Input
                  id="delivPointSame"
                  type="checkbox"
                  name="delivPointSame"
                  innerRef={register}
                  onChange={toggle}
                />{' '}
                Utlämningsställe är samma som gårdens address
              </Label>
            </FormGroup>
            <FormGroup className="pt-2">
              <Button
                type="submit"
                className="btn btn-blue"
                disabled={addressLoading || orgLoading}
                block
              >
                {addressLoading || orgLoading ? (
                  <div>
                    {' '}
                    <Spinner size="sm" role="status" className="mr-2" />{' '}
                    Skickar...
                  </div>
                ) : (
                  'Skicka ansökan'
                )}
              </Button>
            </FormGroup>
          </Col>
        </Row>
      </form>
    </>
  );
};

export default BecomeProducerForm;
