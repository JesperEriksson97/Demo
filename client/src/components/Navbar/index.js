import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Badge,
} from 'reactstrap';
import { inject, observer } from 'mobx-react';
import { ReactComponent as Cart } from '../../icons/cart.svg';
import { ReactComponent as Chat } from '../../icons/chat.svg';
import { ReactComponent as Account } from '../../icons/account.svg';
import { ReactComponent as Profile } from '../../icons/profile.svg';
import { ReactComponent as Logout } from '../../icons/logout.svg';
import Login from '../Login';

const Navigation = ({ currentUser, cart }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <Navbar className="navbar" light expand="md">
        <NavbarBrand className="navbar-brand underline" href="/">
          bonden.se
        </NavbarBrand>
        <NavbarToggler color="light" onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          {currentUser ? (
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/components/">
                  <Chat className="nav-icon" />
                  <span className="nav-text">Meddelande</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/anvandare/kundkorg">
                  <span className="with-icon">
                    <Cart className="nav-icon" />
                    {cart.getProducts()?.length > 0 && (
                      <Badge
                        className="cart-badge"
                        pill
                        color="danger"
                        size="sm"
                      >
                        {cart.getProducts().length}
                      </Badge>
                    )}
                  </span>
                  <span className="nav-text">Kundvagn</span>
                </NavLink>
              </NavItem>

              <NavLink href="/anvandare/mina-sidor">
                <Profile className="nav-icon" />
                <span className="nav-text">Mina sidor</span>
              </NavLink>

              <NavLink href="/logga-ut">
                <Logout className="nav-icon" />
                <span className="nav-text">Logga ut</span>
              </NavLink>
            </Nav>
          ) : (
            <Nav className="ml-auto" navbar>
              <Login>
                <NavLink href="#logga-in">
                  <Account className="nav-icon" />
                  <span className="nav-text">Logga in</span>
                </NavLink>
              </Login>
            </Nav>
          )}
        </Collapse>
      </Navbar>
    </>
  );
};

export default inject('cart')(observer(Navigation));
