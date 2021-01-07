import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Input,
  Form,
  FormGroup,
  Label,
  FormFeedback,
  Button,
} from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { useMutation, useApolloClient } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { PASSWORD_UPDATE } from '../../graphql/user';
import { updatePasswordSchema } from '../../validations/User';
import toast from '../../utils/toast';

const UpdatePasswordForm = () => {
  const history = useHistory();
  const client = useApolloClient();
  const { register, handleSubmit, errors, setError } = useForm({
    mode: 'onChange',
    reValidateMode: 'onBlur',
    resolver: yupResolver(updatePasswordSchema),
    defaultValues: {},
    isSubmitted: true,
  });

  const [updatePassword, { data, loading }] = useMutation(PASSWORD_UPDATE);

  const onSubmit = async (input) => {
    const response = await updatePassword({
      variables: {
        currentPassword: input.currentPassword,
        newPassword: input.newPassword,
      },
    });

    const { success, errors: serverErrors } = response.data.updatePassword;

    if (success) {
      await client.resetStore();
      history.push('/');
      toast.showSuccess({
        title: 'Success',
        message:
          'Du måste logga in. Ditt lösenord har blivit uppdaterad och du har loggats ut från alla enheter.',
      });
    } else {
      serverErrors.forEach((err) => {
        setError(err.path, { message: err.message });
      });
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)} className="settings-form">
        <FormGroup>
          <Label htmlFor="newPassword">Nytt Lösenord</Label>
          <Input
            name="newPassword"
            type="password"
            innerRef={register}
            invalid={!!errors.newPassword}
          />
          <FormFeedback>{errors.newPassword?.message}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="confirmPassword">Upprepa Lösenord</Label>
          <Input
            name="confirmPassword"
            type="password"
            innerRef={register}
            invalid={!!errors.confirmPassword}
          />
          <FormFeedback>{errors.confirmPassword?.message}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="currentPassword">Nuvarande Lösenord</Label>
          <Input
            name="currentPassword"
            type="password"
            innerRef={register}
            invalid={!!errors.currentPassword}
          />
          <FormFeedback>{errors.currentPassword?.message}</FormFeedback>
        </FormGroup>
        <Button
          disabled={loading}
          type="submit"
          className="btn btn-green"
          block
        >
          Spara
        </Button>
        <div className="has-success">
          {data?.updatePassword?.success && 'Lösenordet är uppdaterad'}
        </div>
      </Form>
    </>
  );
};
export default UpdatePasswordForm;
