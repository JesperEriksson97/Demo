import React from 'react';
import PropTypes from 'prop-types';
import { Input, FormGroup, Label, Button, Form, Row, Col } from 'reactstrap';
import { useForm } from 'react-hook-form';

const UpdateOrgForm = ({ organisation, user }) => {
  const { register } = useForm({
    mode: 'onChange',
    reValidateMode: 'onBlur',
    defaultValues: {
      name: organisation?.name,
      org_nr: organisation?.org_nr,
      email: user?.email,
    },
  });

  return (
    <>
      <Form className="org-settings-form" noValidate>
        <FormGroup>
          <Label htmlFor="username">Namn</Label>
          <Input
            disabled
            id="name"
            type="text"
            name="name"
            innerRef={register}
          />
        </FormGroup>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label htmlFor="firstname">Organisationsnummer</Label>
              <Input
                disabled
                id="org_nr"
                type="text"
                name="org_nr"
                innerRef={register}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label htmlFor="lastname">E-post</Label>
              <Input
                disabled
                id="email"
                type="text"
                name="email"
                innerRef={register}
              />
            </FormGroup>
          </Col>
        </Row>

        <FormGroup>
          <Button type="button" className="btn btn-green" block>
            Spara
          </Button>
        </FormGroup>
      </Form>
    </>
  );
};

UpdateOrgForm.propTypes = {
  organisation: PropTypes.object,
  user: PropTypes.object,
};

export default UpdateOrgForm;
