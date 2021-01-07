import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input, FormGroup, Label, FormFeedback, Button } from 'reactstrap';
import { useMutation } from '@apollo/client';
import PropTypes from 'prop-types';
import { USER_SIGNUP } from '../../graphql/user';
import { signupUserSchema } from '../../validations/User';

const SignUpForm = ({ setShowLogin }) => {
  const [signUpUser, { data, loading }] = useMutation(USER_SIGNUP);
  const { register, handleSubmit, errors, setError } = useForm({
    mode: 'onChange',
    reValidateMode: 'onBlur',
    resolver: yupResolver(signupUserSchema),
  });

  const onSubmit = (input) => {
    signUpUser({
      variables: {
        username: input.username,
        email: input.email,
        password: input.password,
      },
    });
  };

  React.useEffect(() => {
    data?.signUp?.errors?.forEach((err) => {
      setError(err.path, {
        message: err.message,
      });
    });
  }, [data]);

  return (
    <>
      {!data?.signUp?.success ? (
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
            <Label htmlFor="username">Användarnamn</Label>
            <Input
              id="username"
              placeholder="Användarnamn"
              type="text"
              name="username"
              innerRef={register}
              invalid={!!errors.username}
            />
            <FormFeedback>{errors.username?.message}</FormFeedback>
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
            <FormFeedback> {errors.password?.message}</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="confirmPassword">Upprepa Lösenord</Label>
            <Input
              id="confirmPassword"
              placeholder="******"
              type="password"
              name="confirmPassword"
              innerRef={register}
              invalid={!!errors.confirmPassword}
            />
            <FormFeedback>{errors.confirmPassword?.message}</FormFeedback>
          </FormGroup>
          <FormGroup id="signup-btns">
            <Button
              disabled={loading}
              type="submit"
              className="btn btn-blue"
              size="sm"
            >
              Skapa konto
            </Button>
            <FormFeedback>Ny medlem skapad</FormFeedback>
            <Button
              id="signup-is-member-btn"
              color="link"
              onClick={() => setShowLogin(true)}
            >
              Redan Medlem? Logga in
            </Button>
          </FormGroup>
        </form>
      ) : (
        <div>
          <div className="has-success">
            Du har blivit registrerad. Klicka här för att{' '}
            <a href="#logga-in" onClick={() => setShowLogin(true)}>
              logga in
            </a>
          </div>
        </div>
      )}
    </>
  );
};

SignUpForm.propTypes = {
  setShowLogin: PropTypes.func.isRequired,
};

export default SignUpForm;
