import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Navbar from '../../components/Navbar';
import { ME_QUERY } from '../../graphql/user';
import Footer from '../../components/Footer';

const Private = ({ component: Component, fullScreen = false, ...rest }) => {
  const userData = useQuery(ME_QUERY);

  const { error, loading, data } = userData;

  if (loading || !data) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  const user = data;

  if (!user.me) {
    return (
      <Redirect
        to={{
          pathname: '/',
        }}
      />
    );
  }

  return (
    <Route
      {...rest}
      render={(props) => (
        <>
          <Navbar currentUser={user.me} />
          <Component {...props} currentUser={user.me} />
          {!fullScreen && <Footer />}
        </>
      )}
    />
  );
};

export default Private;
