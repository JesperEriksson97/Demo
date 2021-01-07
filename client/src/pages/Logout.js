import React from 'react';
import { useHistory } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';
import { clearToken } from '../utils/tokenService';
import MetaData from '../components/MetaData';

const Logout = () => {
  const history = useHistory();
  const client = useApolloClient();

  console.log(client.localState);

  const handleLogout = async () => {
    clearToken();
    await client.resetStore();
    history.push('/');
  };

  React.useEffect(() => {
    /* handleLogout(); */
    const timer = setTimeout(async () => {
      handleLogout();
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <MetaData title="Du loggas ut..." description="" />
      <div
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#8bd16a',
          color: '#fff',
        }}
      >
        <h1>Du loggas ut...</h1>
      </div>
    </>
  );
};

export default Logout;
