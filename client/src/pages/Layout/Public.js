import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { ME_QUERY } from '../../graphql/user';

const Public = ({ component: Component, fullScreen = false, ...rest }) => {
  const userData = useQuery(ME_QUERY);

  const { error, loading, data } = userData;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <Route
      {...rest}
      render={(props) => (
        <>
          {!fullScreen && <Navbar currentUser={data?.me} />}
          <Component {...props} currentUser={data?.me} />
          {!fullScreen && <Footer />}
        </>
      )}
    />
  );
};

Public.propTypes = {
  fullScreen: PropTypes.bool,
};

export default Public;
