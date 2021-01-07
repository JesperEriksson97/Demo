import React from 'react';
import PropTypes from 'prop-types';
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
import { USER_UPDATE } from '../../graphql/user';
import toast from '../../utils/toast';
import { updateUserSchema } from '../../validations/User';

const UpdateUserForm = ({ user }) => {
  const [updateUser, { data, loading }] = useMutation(USER_UPDATE);
  const { register, handleSubmit, errors, setError } = useForm({
    mode: 'onChange',
    reValidateMode: 'onBlur',
    resolver: yupResolver(updateUserSchema),
    defaultValues: !user ? {} : user,
  });

  const onSubmit = async (input) => {
    const pw = prompt('Ange ditt lösenord för att uppdatera din profil.');

    if (pw) {
      const response = await updateUser({
        variables: {
          currentPassword: pw,
          username: input.username,
          email: input.email,
          firstname: input.firstname,
          lastname: input.lastname,
        },
      });

      const { success, errors: serverErrors } = response.data.updateUser;

      if (success) {
        /* Handle success */
        console.log('User was successfully updated');
      } else {
        serverErrors.forEach((err) => {
          /* if (err.path === 'password') {
            // Vissa toast med meddelande från servern
          } */
          setError(err.path, {
            message: err.message,
          });
        });
      }
    } else {
      toast.showError({
        title: 'Varning',
        message: 'Du måste ange ditt lösenord för att uppdatera användaren.',
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
          <Label htmlFor="username">Användarnamn</Label>
          <Input
            autoFocus
            id="username"
            placeholder="Användarnamn"
            type="text"
            name="username"
            innerRef={register}
            invalid={!!errors.username}
          />
          <FormFeedback>{errors.username?.message}</FormFeedback>
        </FormGroup>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label htmlFor="firstname">Förnamn</Label>
              <Input
                id="firstname"
                placeholder="Förnamn"
                type="text"
                name="firstname"
                innerRef={register}
                invalid={!!errors.firstname}
              />
              <FormFeedback>{errors.firstname?.message}</FormFeedback>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label htmlFor="lastname">Efternamn</Label>
              <Input
                id="lastname"
                placeholder="Efternamn"
                type="text"
                name="lastname"
                innerRef={register}
                invalid={!!errors.lastname}
              />
              <FormFeedback>{errors.lastname?.message}</FormFeedback>
            </FormGroup>
          </Col>
        </Row>
        <FormGroup>
          <Label htmlFor="email">E-post</Label>
          <Input
            id="email"
            placeholder="E-post"
            type="email"
            name="email"
            innerRef={register}
            invalid={!!errors.email}
          />
          <FormFeedback>{errors.email?.message}</FormFeedback>
        </FormGroup>
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
            {data?.updateUser?.success && 'Användarinformation uppdaterad'}
          </div>
        </FormGroup>
      </Form>
    </>
  );
};

UpdateUserForm.propTypes = {
  user: PropTypes.object,
};

export default UpdateUserForm;
