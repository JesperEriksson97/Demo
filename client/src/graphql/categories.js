import { gql } from '@apollo/client';

export const CATEGORIES_QUERY = gql`
  query categories {
    categories {
      value
      label
    }
  }
`;
