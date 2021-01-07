import React from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Input, FormGroup, Label, Button, FormFeedback } from 'reactstrap';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@apollo/client';
import PropTypes from 'prop-types';

import { USER_SIGNIN, ME_QUERY } from '../../graphql/user';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../config/constants';
import { loginUserSchema } from '../../validations/User';

const LoginForm = ({ setShowLogin }) => {
  const history = useHistory();
  const [signInUser, { data, loading }] = useMutation(USER_SIGNIN);
  const { register, handleSubmit, errors, setError } = useForm({
    mode: 'onChange',
    reValidateMode: 'onBlur',
    resolver: yupResolver(loginUserSchema),
  });

  const onSubmit = async (input) => {
    const response = await signInUser({
      variables: {
        email: input.email,
        password: input.password,
      },
      update: (cache, { data: { signIn } }) => {
        cache.writeQuery({
          query: ME_QUERY,
          data: {
            __typename: 'User',
            me: signIn?.user,
          },
        });
      },
    });

    const {
      success,
      token,
      refreshToken,
      errors: serverErrors,
    } = response.data.signIn;

    if (success) {
      localStorage.setItem(ACCESS_TOKEN, token);
      localStorage.setItem(REFRESH_TOKEN, refreshToken);
      history.push('/anvandare/mina-sidor');
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
      {!data?.signIn?.success ? (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <FormGroup>
            <Label htmlFor="email">E-post</Label>
            <Input
              autoFocus
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
            <Label htmlFor="password">Lösenord</Label>
            <Input
              id="password"
              placeholder="******"
              type="password"
              name="password"
              innerRef={register}
              invalid={!!errors.password}
            />
            <FormFeedback>{errors.password?.message}</FormFeedback>
          </FormGroup>
          <FormGroup id="login-btns">
            <Button
              type="submit"
              className="btn btn-blue"
              size="sm"
              disabled={loading}
            >
              Logga in
            </Button>
            <Button
              color="link"
              onClick={() => setShowLogin(false)}
              aria-hidden="true"
            >
              Bli medlem!
            </Button>
          </FormGroup>
        </form>
      ) : (
        <div className="has-success">Du loggas in...</div>
      )}
    </>
  );
};

LoginForm.propTypes = {
  setShowLogin: PropTypes.func.isRequired,
};

export default LoginForm;
