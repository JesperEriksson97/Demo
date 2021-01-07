import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';

const Section = ({ children, fullWidth = false, ...rest }) => (
  <>
    <Container fluid={fullWidth} {...rest}>
      {children}
    </Container>
  </>
);

Section.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  fullWidth: PropTypes.bool,
};

export default Section;
