import { ApolloClient, InMemoryCache, ApolloLink } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { ACCESS_TOKEN, REFRESH_TOKEN } from './config/constants';

const httpLink = createUploadLink({
  uri: process.env.REACT_APP_GRAPHQL_SERVER,
});

const middlewareLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      'access-token': localStorage.getItem(ACCESS_TOKEN),
      'refresh-token': localStorage.getItem(REFRESH_TOKEN),
    },
  }));

  return forward(operation);
});

const afterwareLink = new ApolloLink((operation, forward) =>
  forward(operation).map((response) => {
    const context = operation.getContext();
    const {
      response: { headers },
    } = context;

    if (headers) {
      const accessToken = headers.get(ACCESS_TOKEN);
      const refreshToken = headers.get(REFRESH_TOKEN);

      if (accessToken) {
        localStorage.setItem(ACCESS_TOKEN, accessToken);
      }

      if (refreshToken) {
        localStorage.setItem(REFRESH_TOKEN, refreshToken);
      }
    }

    return response;
  })
);

const link = afterwareLink.concat(middlewareLink.concat(httpLink));

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
