import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
/* Layouts */
import Public from './Layout/Public';
import Private from './Layout/Private';
import PrivateOrg from './Layout/PrivateOrg';
/* Routes - Public */
import Home from './Home';
import Products from './Products';
import Product from './Product';
import Cart from './Cart';
import Logout from './Logout';
import NotFound from './NotFound';
/* Routes - Private */
import UserOverview from './_User/UserOverview';
import ProductOverview from './_Producer/ProductOverview';
import UserSettings from './_User/UserSettings';
import BecomeProducer from './_User/BecomeProducer';
import Toast from '../components/Toast';
/* Routes - Private Producer */
import AddProduct from './_Producer/AddProduct';
import ProducerOverview from './_Producer/ProducerOverview';
import EditProduct from './_Producer/EditProduct';
import ProducerSettings from './_Producer/ProducerSettings';

const Routes = () => (
  <Router>
    <Switch>
      {/* Public */}
      <Public exact path="/" component={Home} />
      <Public exact path="/produkter" component={Products} />
      <Public exact path="/produkter/produkt/:id" component={Product} />
      <Public exact path="/logga-ut" component={Logout} fullScreen />
      {/* Private - User */}
      <Private exact path="/anvandare/mina-sidor" component={UserOverview} />
      <Private
        exact
        path="/anvandare/mina-sidor/installningar"
        component={UserSettings}
      />
      <Private
        exact
        path="/anvandare/mina-sidor/bli-producent"
        component={BecomeProducer}
      />
      <Private exact path="/anvandare/kundkorg" component={Cart} />
      {/* Private - Producer */}
      <PrivateOrg
        exact
        path="/producent/skapa-produkt"
        component={AddProduct}
      />
      <PrivateOrg
        exact
        path="/producent/mina-sidor/produkter"
        component={ProductOverview}
      />
      <PrivateOrg
        exact
        path="/producent/mina-sidor/produkter/andra-produkt/:id"
        component={EditProduct}
      />
      <PrivateOrg
        exact
        path="/producent/mina-sidor"
        component={ProducerOverview}
      />
      <PrivateOrg
        exact
        path="/producent/mina-sidor/installningar"
        component={ProducerSettings}
      />
      {/* Private - Admin */}
      {/* Catch All - Error */}
      <Public path="*" component={NotFound} />
    </Switch>
    <Toast />
  </Router>
);

export default Routes;
