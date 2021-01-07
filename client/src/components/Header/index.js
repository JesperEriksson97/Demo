import React from 'react';
import { Jumbotron, Container } from 'reactstrap';
import Searchbar from '../Searchbar';

const Header = () => (
  <>
    <Jumbotron fluid className="header">
      <Container>
        <h2 className="app-slogan">BYTT ÄR BYTT</h2>
        <Searchbar />
      </Container>
    </Jumbotron>
  </>
);

export default Header;
