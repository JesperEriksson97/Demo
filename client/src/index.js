import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style/index.css';
import { ApolloProvider } from '@apollo/client';
import { Provider } from 'mobx-react';
import { rootStore } from './stores/Root';
import { client } from './apollo';
import App from './App';

ReactDOM.render(
  <>
    <ApolloProvider client={client}>
      <Provider {...rootStore}>
        <App />
      </Provider>
    </ApolloProvider>
  </>,
  document.getElementById('root')
);
