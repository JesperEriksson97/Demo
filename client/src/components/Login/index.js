import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { NavItem } from 'reactstrap';
import LoginForm from '../../forms/LoginForm';
import CustomModal from '../CustomModal';
import SignUpForm from '../../forms/SignUpForm';

const Login = ({ children }) => {
  const [show, setShow] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const toggle = () => {
    setShow(!show);
    setShowLogin(true);
  };

  return (
    <>
      <CustomModal
        header
        title={showLogin ? 'Mina sidor' : 'Bli medlem'}
        content={
          showLogin ? (
            <LoginForm setShowLogin={setShowLogin} />
          ) : (
            <SignUpForm setShowLogin={setShowLogin} />
          )
        }
        show={show}
        toggle={toggle}
        id="login-modal"
      />

      <NavItem style={{ listStyle: 'none' }} onClick={() => setShow(true)}>
        {children}
      </NavItem>
    </>
  );
};

Login.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default Login;
