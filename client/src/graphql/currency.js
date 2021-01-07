import { gql } from '@apollo/client';

export const CURRENCIES_QUERY = gql`
  query getCurrencies {
    getCurrencies {
      name
      id
    }
  }
`;
